import { Navigate, RouteObject } from "react-router-dom";

import { isAuthenticated } from "@utils/helpers";

import Main from "@layouts/Main";

import Login from "@pages/Login";

import Chat from "@pages/Chat";
import Register from "@pages/Register";

const Private = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to={"/login"} />;
};

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "app",
    element: <Private element={<Main />} />,
    children: [
      {
        path: "chat",
        element: <Private element={<Chat />} />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: isAuthenticated() ? (
  //     <Navigate to={"/app/chat"} />
  //   ) : (
  //     <Navigate to={"/login"} />
  //   ),
  // },
];

export default routes;
