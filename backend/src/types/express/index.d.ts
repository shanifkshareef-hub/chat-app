import { User } from "prisma/prisma-client";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
