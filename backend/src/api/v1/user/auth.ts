import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { Container } from "typedi";

import AuthService from "../../../services/auth";
import middlewares from "../../../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/login",
    middlewares.validation.loginSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Sign-In endpoint with body: %o", req.body);
      try {
        const { email, password } = req.body;

        const authServiceInstance = Container.get(AuthService);

        const resp = await authServiceInstance.Login(email, password);
        return res.json({
          status: true,
          data: {
            user: resp.user,
            token: resp.token,
          },
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/register",
    middlewares.validation.loginSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = Container.get(AuthService);

        const user = await authServiceInstance.Register(req.body);
        return res.json({
          status: true,
          data: user,
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.get("/pk", async (_: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get("logger");
    try {
      const authServiceInstance = Container.get(AuthService);
      const pk = await authServiceInstance.GetPk();
      return res.json({
        status: true,
        data: pk,
      });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });
};
