import { request, response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";

/**
 * @param {request} req
 * @param {response} res
 */
export function newFileFormGet(req, res) {
  res.render("files/newFile", { user: req.user });
}

/**
 * @param {request} req
 * @param {response} res
 */
export async function newFileFormPost(req, res) {
  try {
    const { originalname, size } = req.file;
    const prisma = new PrismaClient();
    await prisma.file.create({
      data: {
        name: originalname,
        size: size,
        authorId: req.user.id,
        downloadUrl: "",
      },
    });
    res.redirect("/home");
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export async function viewFileGet(req, res) {
  const prisma = new PrismaClient();
  const { fileId } = req.params;
  const file = await prisma.file.findFirst({
    where: {
      authorId: req.user.id,
      id: parseInt(fileId),
    },
  });
  res.render("files/viewFile", { file: file });
}

/**
 * @param {request} req
 * @param {response} res
 */
export async function deleteFileGet(req, res) {
  const prisma = new PrismaClient();
  const { fileId } = req.params;
  await prisma.file.delete({
    where: {
      authorId: req.user.id,
      id: parseInt(fileId),
    },
  });
  res.redirect("/home");
}
