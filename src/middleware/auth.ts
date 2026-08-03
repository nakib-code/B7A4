import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

import { Role, UserStatus } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization.split(" ")[1]
          : req.headers.authorization;

      if (!token) {
        const error: any = new Error(
          "You are not logged in. Please log in to access this resource."
        );
        error.statusCode = httpStatus.UNAUTHORIZED;
        throw error;
      }

      // jwt.verify() error হলে এটি globalErrorHandler-এ চলে যাবে
      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret
      ) as JwtPayload;

      const { id, email, name, role } = verifiedToken;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        const error: any = new Error(
          "Forbidden. You don't have permission to access this resource."
        );
        error.statusCode = httpStatus.FORBIDDEN;
        throw error;
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        const error: any = new Error(
          "User not found. Please log in again."
        );
        error.statusCode = httpStatus.NOT_FOUND;
        throw error;
      }

      if (user.status === UserStatus.BLOCKED) {
        const error: any = new Error(
          "Your account has been blocked. Please contact support."
        );
        error.statusCode = httpStatus.FORBIDDEN;
        throw error;
      }

      req.user = {
        id,
        name,
        email,
        role,
      };

      next();
    }
  );
};

export default auth;