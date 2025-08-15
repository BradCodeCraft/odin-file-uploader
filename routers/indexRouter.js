import { Router } from "express";
import { welcomePageGet } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.route("/").get(welcomePageGet);

export default indexRouter;
