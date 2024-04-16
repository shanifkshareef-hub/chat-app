import { Navigate, RouteObject } from "react-router-dom";

import { isAuthenticated } from "@utils/helpers";

import Main from "@layouts/Main";

import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";

import Menu1 from "@components/Menu/Menu1";
import Menu2 from "@components/Menu/Menu2";
import NewForm from "@pages/Form";
import Chat from "@pages/Chat/Chat";

const Private = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to={"/login"} />;
};

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
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
  {
    path: "*",
    element: isAuthenticated() ? (
      <Navigate to={"/app/chat"} />
    ) : (
      <Navigate to={"/login"} />
    ),
  },
];

export default routes;
