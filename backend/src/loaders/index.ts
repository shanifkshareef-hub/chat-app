import { Express } from "express";
import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";

export default async (expressApp: Express) => {
  await dependencyInjectorLoader();
  await expressLoader({ app: expressApp });
};
