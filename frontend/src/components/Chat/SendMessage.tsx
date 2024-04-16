import React, { useState } from "react";
import { Socket } from "socket.io-client";
export interface ISendMessage {
  socket: Socket;
}
export const SendMessage: React.FC<ISendMessage> = ({ socket }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="mt-4 flex space-x-4">
      <input
        className="block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div className="">
        <button
          onClick={() => {
            socket.emit("chat message", { message });
          }}
          type="submit"
          className="py-2 group relative flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600  px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
