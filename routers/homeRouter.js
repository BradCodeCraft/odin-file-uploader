import { Router } from "express";
import { homePageGet } from "../controllers/homeController.js";
import fileRouter from "./filesRouter.js";

const homeRouter = Router();

homeRouter.route("/").get(homePageGet);
homeRouter.use("/files", fileRouter);

export default homeRouter;
