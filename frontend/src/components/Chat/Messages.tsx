import { decodePayload } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { MessageData } from "src/interfaces/common";
export interface IMessages {
  socket: Socket;
}
const MessageList: React.FC<IMessages> = ({ socket }) => {
  const [messageData, setMessageData] = useState<MessageData[]>([]);

  useEffect(() => {
    socket.on("chat message", (data) => {
      console.log(data);
      setMessageData((state) => [...state, data]);
    });
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  const payload = decodePayload();

  return (
    <div className="h-full ">
      {payload && (
        <div className="space-y-4 flex flex-col justify-end h-full overflow-auto">
          {messageData.map((item) => {
            return (
              <div className="flex justify-between text-xs">
                <div className="">
                  <div className={`${item.id === payload.id ? "hidden" : ""}`}>
                    <div className="bg-indigo-200 text-gray-600 rounded-md px-2 py-1 text-sm leading-none w-fit">
                      <p className="text-indigo-600 font-medium text-xs">
                        {item.userName}
                      </p>
                      <p className="mt-1">{item.message}</p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div
                    className={`${
                      item.id !== payload.id ? "hidden" : "text-right"
                    }`}
                  >
                    <div className="bg-blue-300 text-white rounded-md px-2 py-1 text-sm leading-none w-fit">
                      {item.message}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageList;
