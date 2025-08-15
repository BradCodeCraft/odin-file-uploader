import { Router } from "express";
import {
  addFileToFolderGet,
  addFileToFolderPost,
  filesInFolderGet,
  removeFileFromFolderGet,
  viewFileInFolderGet,
} from "../controllers/filesInFolderController.js";

const filesInFolderRouter = Router({ mergeParams: true });

filesInFolderRouter.route("/").get(filesInFolderGet);
filesInFolderRouter
  .route("/add")
  .get(addFileToFolderGet)
  .post(addFileToFolderPost);
filesInFolderRouter.route("/:fileId").get(viewFileInFolderGet);
filesInFolderRouter.route("/:fileId/remove").get(removeFileFromFolderGet);

export default filesInFolderRouter;
