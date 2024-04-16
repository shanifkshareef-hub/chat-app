import bcrypt from "bcrypt";
import { Logger } from "winston";
import { Inject, Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import config from "../config";
import { IUser } from "../interface/User";

import {
  BadRequestError,
  HttpError,
  NotFoundError,
  UnauthorizedError,
} from "../api/errors";
import helpers from "../helpers";

@Service()
export default class AuthService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("prisma") private prisma: PrismaClient
  ) {}

  public async Login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    let user = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            email: email,
          },
        ],
      },
    });
    if (!user) {
      throw new UnauthorizedError("Invalid login credentials");
    }
    let same = await bcrypt.compare(password, user.password);
    if (same) {
      let token = helpers.generateLoginToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName.trim(),
        },
        token: token,
      };
    } else {
      throw new UnauthorizedError("Invalid login credentials");
    }
  }

  public async Register(data: {
    email: string;
    password: string;
    userName: string;
  }): Promise<IUser> {
    let user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const salt = await bcrypt.genSalt(config.seed);
    let hashed: string = await bcrypt.hash(data.password, salt);

    if (user) {
      throw new BadRequestError("User already exists");
    }

    const { password, ...rest } = await this.prisma.user.create({
      data: {
        ...data,
        password: hashed,
      },
    });

    return rest;
  }

  public async ResetPassword(email: string): Promise<IUser> {
    let isExist = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!isExist) {
      throw new NotFoundError("User not found");
    }

    const salt = await bcrypt.genSalt(config.seed);
    let tmpPass = Math.random().toString(36).substring(2, 7);
    let password: string = await bcrypt.hash(tmpPass, salt);

    this.logger.warn("Password is %s", tmpPass);

    let user = await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password,
      },
    });

    return {
      id: user.id,
      userName: user.userName.trim(),
      email: user.email,
    };
  }

  public GetPk(): string {
    try {
      return config.keys.public.replace(/\\n/gm, "\n");
    } catch (e) {
      throw new HttpError(503, "Unable to get public key");
    }
  }
}
