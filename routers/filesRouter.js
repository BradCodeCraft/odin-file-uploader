import { Router } from "express";
import {
  deleteFileGet,
  filesPageGet,
  newFileFormGet,
  newFileFormPost,
  viewFileGet,
} from "../controllers/filesController.js";
import multer from "multer";

const fileRouter = Router({ mergeParams: true });
const upload = multer({ dest: "uploads/" });

fileRouter.route("/").get(filesPageGet);
fileRouter
  .route("/new")
  .get(newFileFormGet)
  .post(upload.single("file"), newFileFormPost);
fileRouter.route("/:fileId").get(viewFileGet);
fileRouter.route("/:fileId/delete").get(deleteFileGet);

export default fileRouter;
