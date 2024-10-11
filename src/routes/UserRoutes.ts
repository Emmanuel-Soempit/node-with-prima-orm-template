//@ts-nocheck
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { LoginMiddleware } from "../middleware/login";
import { RegistrationMiddleware } from "../middleware/registration";
import { AuthMiddleware } from "../middleware/auth";

const usersController = new UsersController();
const userRoutes = Router();

userRoutes.post("/auth/login", LoginMiddleware, usersController.Login);
userRoutes.post(
  "/auth/registration",
  AuthMiddleware,
  RegistrationMiddleware,
  usersController.Register
);

export default userRoutes;
