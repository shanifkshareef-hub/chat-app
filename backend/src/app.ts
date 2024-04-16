import "reflect-metadata";

import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
import http from "http";
import { Server } from "socket.io";
import { verifyToken } from "./helpers";

let app = express();

(async () => {
  await require("./loaders").default(app);

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const authToken = socket.handshake.headers.authorization;

    const payload = verifyToken(authToken as string);
    if (!payload) {
      console.log("Invalid token");
      socket.emit("unauthorized");
      return socket.disconnect();
    }
    const { id, userName } = payload;

    socket.on("chat message", (msg) => {
      io.emit("chat message", { userName, id, message: msg.message });
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
