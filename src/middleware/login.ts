import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendError } from "../utils";

export const LoginMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(20).required(),
    });

    const validate = schema.validate(req.body);

    if (validate.error) {
      return sendError(res, {
        message: validate.error.message,
        status: 400,
      });
    }
    next();
  } catch (error) {
    return sendError(res, { message: "Login error", status: 400 });
  }
};
