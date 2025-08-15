import { Router } from "express";
import {
  deleteFileGet,
  newFileFormGet,
  newFileFormPost,
  viewFileGet,
} from "../controllers/filesController.js";
import multer from "multer";

const filesRouter = Router({ mergeParams: true });
const upload = multer({ dest: "uploads/" });

filesRouter
  .route("/new")
  .get(newFileFormGet)
  .post(upload.single("file"), newFileFormPost);
filesRouter.route("/:fileId").get(viewFileGet);
filesRouter.route("/:fileId/delete").get(deleteFileGet);

export default filesRouter;
