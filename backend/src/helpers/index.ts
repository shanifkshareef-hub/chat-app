import multer from "multer";
import jwt from "jsonwebtoken";

import config from "../config";
import { User } from "@prisma/client";
import { TokenPayload } from "../interface/User";

const makeid = (length: number): string => {
  let result: string[] = [];
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function generateLoginToken(user: User): string {
  var privateKey = config.keys.private.replace(/\\n/gm, "\n");

  var token = jwt.sign(
    { id: user.id, email: user.email, userName: user.userName },
    privateKey,
    {
      expiresIn: "3d",
      algorithm: "RS256",
    }
  );
  return token;
}

export const verifyToken = (token: string) => {
  var key = config.keys.public.replace(/\\n/gm, "\n");

  try {
    return jwt.verify(token, key) as TokenPayload;
  } catch (error) {
    return false;
  }
};

export default {
  makeid,
  storage,
  formatBytes,
  generateLoginToken,
};
