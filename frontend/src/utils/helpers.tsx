import { notification } from "antd";
import { KJUR } from "jsrsasign";

export const clearToken = () => {
  localStorage.clear();
};

export const baseUrl = import.meta.env.VITE_BASE_URL;

export function isAuthenticated(): boolean {
  const token = window.localStorage.getItem("token");
  const pk = window.localStorage.getItem("pk");

  if (!token || !pk) return false;

  if (!KJUR.jws.JWS.verifyJWT(token, pk, { alg: ["RS256"] })) {
    notification.error({
      message: "Error during authentication",
      description: "Kindly login again to proceed",
    });

    clearToken();
    return false;
  }
  return true;
}
