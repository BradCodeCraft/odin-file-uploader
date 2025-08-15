import { Router } from "express";
import {
  deleteFolderGet,
  newFolderGet,
  newFolderPost,
  viewFormGet,
} from "../controllers/foldersController.js";
import filesInFolderRouter from "./filesInFolderRouter.js";

const foldersRouter = Router();

foldersRouter.route("/new").get(newFolderGet).post(newFolderPost);
foldersRouter.route("/:folderId").get(viewFormGet);
foldersRouter.route("/:folderId/delete").get(deleteFolderGet);
foldersRouter.use("/:folderId/files", filesInFolderRouter);

export default foldersRouter;
