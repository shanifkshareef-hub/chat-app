const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

import { PrismaClient } from "@prisma/client";
import { PassportStatic } from "passport";
import { StrategyOptions } from "passport-jwt";

import config from "../config";

var opts: StrategyOptions = {
  secretOrKey: config?.keys?.public?.replace(/\\n/gm, "\n"),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["RS256"],
};

const prisma = new PrismaClient();

export function auth(passport: PassportStatic) {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        let user = await prisma.user.findFirst({
          where: {
            AND: [
              {
                id: jwt_payload.id,
              },
            ],
          },
        });
        if (user) {
          delete user.password;
          return done(null, JSON.parse(JSON.stringify(user)));
        } else {
          return done(null, false, { message: "invalid token" });
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
