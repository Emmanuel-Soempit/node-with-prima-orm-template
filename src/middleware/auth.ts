import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendError } from "../utils";
import { decodeWebToken } from "../services/auth";

export const AuthMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, {
        message: "Access denied",
        error: "Token required",
        status: 401,
      });
    }

    const data = decodeWebToken(token);

    if (data) {
      next();
      return;
    }

    return sendError(res, {
      message: "Access denied",
      error: "Invalid token",
      status: 401,
    });
  } catch (error) {
    return sendError(res, {
      message: "Something went wrong",
      error: "Internal server error",
    });
  }
};
