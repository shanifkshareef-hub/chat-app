import React, { useEffect } from "react";
import { connect } from "socket.io-client";

const Chat = () => {
  const socket = connect("http://localhost:8000", {
    query: { token: localStorage.getItem("token") },
  });

  useEffect(() => {
    socket.on("chat message", (data) => {
      console.log(data);
      // setMessagesReceived((state) => [
      //   ...state,
      //   {
      //     message: data.message,
      //     username: data.username,
      //     __createdtime__: data.__createdtime__,
      //   },
      // ]);
    });
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <div>
      <div className="bg-white rounded-md">
        <div className="border rounded-md p-4 border-gray-300">
          <p className="font-semibold">Messages</p>
        </div>
        <div className="p-4"></div>
        <div className="p-4">
          <div className="mt-4 ">
            <textarea
              name=""
              className="block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter message..."
            />
            <div className="my-4 w-fit ml-auto">
              <button
                onClick={() => {
                  socket.emit("chat message", { message: "hiii" });
                }}
                type="submit"
                className="group relative flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
