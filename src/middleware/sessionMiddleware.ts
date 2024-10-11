import session from "express-session";
import { redisClient } from "../services/redisService";

export const SessionMiddleware = session({
  store: redisClient,
  secret: "your_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});
