import MessageList from "@components/Chat/Messages";
import { SendMessage } from "@components/Chat/SendMessage";
import { clearToken } from "@utils/helpers";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, connect } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const socket = connect("http://localhost:8000", {
    // query: { token: localStorage.getItem("token") },
    extraHeaders: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  let temp: Socket;

  useEffect(() => {
    socket.on("unauthorized", () => {
      clearToken();
      navigate("/login");
    });
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <div className="h-full bg-white p-4">
      {socket && (
        <div className="rounded-md max-w-3xl h-full mx-auto flex flex-col">
          <div className="border p-4 rounded-md border-gray-200 flex-1">
            <MessageList socket={socket} />
          </div>
          <SendMessage socket={socket} />
        </div>
      )}
    </div>
  );
};

export default Chat;
