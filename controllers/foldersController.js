import { request, response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { body, validationResult } from "express-validator";

/**
 * @param {request} req
 * @param {response} res
 */
export function newFolderGet(req, res) {
  res.render("folders/newFolder");
}

const validateNewFolder = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty."),
];
export const newFolderPost = [
  validateNewFolder,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.render("folders/newFolder", { errors: errors.array() });

      const prisma = new PrismaClient();
      const { name } = req.body;
      await prisma.folder.create({
        data: {
          name: name,
          authorId: req.user.id,
        },
      });
      res.redirect("/home");
    } catch (e) {
      console.error(e);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function viewFormGet(req, res) {}

/**
 * @param {request} req
 * @param {String} folderId
 */
export async function deleteFolderGet(req, res) {
  try {
    const prisma = new PrismaClient();
    const { folderId } = req.params;

    await prisma.folder.delete({
      where: {
        id: parseInt(folderId),
      },
    });

    res.redirect("/home");
  } catch (e) {
    console.error(e);
  }
}
