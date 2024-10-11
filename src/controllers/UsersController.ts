import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils";
import { prisma } from "../services/database";
import argon2 from "argon2";
import { generateWebToken } from "../services/auth";

export default class UsersController {
  /**
   * @param req USER REQUEST
   * @param res SERVER RESPONSE
   * @returns Response
   */
  async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({ where: { email } });

      //verfiy password if user found with argon2
      if (user) {
        const passwordVerified = await argon2.verify(user.password, password);

        if (passwordVerified) {
          const token = generateWebToken({
            email: user.email,
            id: user.id,
            duration: "1h",
          });

          const { password: _, ...userWithoutPassword } = user;

          return sendSuccess(res, {
            message: "Login Successful",
            data: { user: userWithoutPassword, token },
          });
        }
        return sendError(res, {
          message: "Authenciation Error",
          error: "Incorrect Password",
          status: 401,
        });
      }

      return sendError(res, {
        message: "Authentication error",
        error: "Email does not exist",
        status: 404,
      });
    } catch (error) {
      return sendError(res, { message: "Error Loging in" });
    }
  }

  /**
   *  Register user
   * @param req USER REQUEST
   * @param res SERVER RESPONSE
   * @returns Response
   */
  async Register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;

      //find in db by email
      let user = await prisma.user.findFirst({
        where: { email },
      });

      //Create user (Hash password wuth argon2) if not found in db
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            password: (await argon2.hash(password)) as string,
          },
        });
        return sendSuccess(res, {
          message: "Registration Successful",
          data: user,
        });
      }

      //send error if user is found
      return sendError(res, {
        message: "Registration failed!",
        error: "Email has already been taken",
        status: 400,
      });
    } catch (error: any) {
      return sendError(res, {
        message: "Something wen wrong",
        error: error.message,
      });
    }
  }
}
