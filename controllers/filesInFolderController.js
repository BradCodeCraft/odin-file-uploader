import { request, response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { body, validationResult } from "express-validator";

/**
 * @param {request} req
 * @param {response} res
 */
export async function filesInFolderGet(req, res) {
  try {
    const prisma = new PrismaClient();
    const { folderId } = req.params;
    const filesInFolder = await prisma.folder.findFirst({
      where: {
        authorId: parseInt(req.user.id),
        id: parseInt(folderId),
      },
      select: {
        files: true,
      },
    });
    res.render("folders/filesInFolder/filesInFolder", {
      folderId: folderId,
      files: filesInFolder.files,
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {request} req
 * @param {String} folderId
 */
async function getFilesNotInFolder(req, folderId) {
  try {
    const prisma = new PrismaClient();

    return await prisma.file.findMany({
      where: {
        authorId: parseInt(req.user.id),
        folders: {
          none: {
            id: parseInt(folderId),
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export async function addFileToFolderGet(req, res) {
  try {
    const { folderId } = req.params;
    const filesNotInFolder = await getFilesNotInFolder(req, folderId);
    res.render("folders/addFileToFolder", {
      folderId: folderId,
      files: filesNotInFolder,
    });
  } catch (e) {
    console.error(e);
  }
}

const validateFileToAdd = [
  body("add-file")
    .not()
    .isIn(["default"])
    .withMessage("Please select an option"),
];
export const addFileToFolderPost = [
  validateFileToAdd,
  async (req, res) => {
    const errors = validationResult(req);
    const { folderId } = req.params;

    if (!errors.isEmpty()) {
      const filesNotInFolder = await getFilesNotInFolder(req, folderId);
      return res.render("folders/addFileToFolder", {
        folderId: folderId,
        files: filesNotInFolder,
        errors: errors.array(),
      });
    }

    const prisma = new PrismaClient();
    const { addFileId } = req.body;
    await prisma.file.update({
      where: {
        authorId: parseInt(req.user.id),
        id: parseInt(addFileId),
      },
      data: {
        folders: {
          connect: {
            id: parseInt(folderId),
          },
        },
      },
    });

    res.redirect(`/home/folders/${folderId}/files`);
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function viewFileInFolderGet(req, res) {
  try {
    const prisma = new PrismaClient();
    const { folderId, fileId } = req.params;
    const file = await prisma.file.findFirst({
      where: {
        id: parseInt(fileId),
        folders: {
          some: {
            id: parseInt(folderId),
          },
        },
      },
    });

    res.render("folders/filesInFolder/viewFileInFolder", {
      folderId: folderId,
      file: file,
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export async function removeFileFromFolderGet(req, res) {
  try {
    const prisma = new PrismaClient();
    const { folderId, fileId } = req.params;
    await prisma.file.update({
      where: {
        id: parseInt(fileId),
      },
      data: {
        folders: {
          disconnect: [{ id: parseInt(folderId) }],
        },
      },
    });

    res.redirect(`/home/folder/${folderId}/files`);
  } catch (e) {
    console.error(e);
  }
}
