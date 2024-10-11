import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import { sendError } from "../utils";

export const RegistrationMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(6).max(20).required(),
    });

    const validate = schema.validate(req.body);
    if (validate.error) {
      return sendError(res, {
        message: validate.error?.message,
      });
    }
    next();
  } catch (error) {
    return sendError(res, {
      message: "Something went wrong",
    });
  }
};
