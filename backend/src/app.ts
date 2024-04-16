import "reflect-metadata";

import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
// import WebSocket from "ws";
import http from "http";
import { Server } from "socket.io";

let app = express();

(async () => {
  await require("./loaders").default(app);

  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("socket is ready for connection", socket.id);

    console.log("token");

    const token = socket.handshake.headers.token;

    if (!token) {
      socket.disconnect();
    }

    socket.on("chat message", (msg) => {
      console.log("chat", msg);

      io.emit("chat message", msg);
    });
  });

  server
    .listen(config.port, () => {
      Logger.info(`🛡️ Server listening on port: ${config.port} 🛡️`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });

  // // Create HTTP server by passing the Express app
  // // const server = http.createServer(app);

  // // Integrate WebSocket with the HTTP server
  // const wss = new WebSocket.Server({ port: 8181 });

  // // const wss = new WebSocket.Server({ server });

  // wss.on("connection", function connection(ws) {
  //   console.log("WS connection arrived");

  //   ws.on("message", function incoming(message) {
  //     console.log("received: %s", message);
  //     // Echo the message back to the client
  //     ws.send(`Echo: ${message}`);
  //   });

  //   // Send a welcome message on new connection
  //   ws.send("Welcome to the chat!");
  // });

  process.on("unhandledRejection", function (reason, p) {
    Logger.warn(
      "Possibly Unhandled Rejection at: Promise ",
      p,
      " reason: ",
      reason
    );
  });
})();

export default app;
