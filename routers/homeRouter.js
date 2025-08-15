import { Router } from "express";
import { homePageGet } from "../controllers/homeController.js";
import filesRouter from "./filesRouter.js";
import foldersRouter from "./foldersRouter.js";

const homeRouter = Router();

homeRouter.route("/").get(homePageGet);
homeRouter.use("/files", filesRouter);
homeRouter.use("/folders", foldersRouter);

export default homeRouter;
