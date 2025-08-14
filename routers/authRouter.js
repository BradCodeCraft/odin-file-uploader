import { Router } from "express";
import {
  logInPageGet,
  logInPagePost,
  logOutGet,
  signUpPageGet,
  signUpPagePost,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/sign-up").get(signUpPageGet).post(signUpPagePost);
authRouter.route("/log-in").get(logInPageGet).post(logInPagePost);
authRouter.route("/log-out").get(logOutGet);

export default authRouter;
