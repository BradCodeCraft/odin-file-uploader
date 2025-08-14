import { request, response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { createClient } from "@supabase/supabase-js";

/**
 * @param {request} req
 * @param {response} res
 */
export async function filesPageGet(req, res) {
  const prisma = new PrismaClient();
  const files = await prisma.file.findMany({
    where: {
      authorId: req.user.id,
    },
  });
  res.render("files/files", { user: req.user, files: files });
}

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
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
    const { originalname, size } = req.file;
    console.log(req.file);
    const { data, error } = await supabase.storage
      .from("odin_file_uploader")
      .upload(`public/${req.user.username}_${originalname}`, req.file);
    console.log(data, error);
    const prisma = new PrismaClient();
    // await prisma.file.create({
    //   data: {
    //     name: originalname,
    //     size: size,
    //     authorId: req.user.id,
    //     downloadUrl: "",
    //   },
    // });
    res.redirect("/files");
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
  res.redirect("/files");
}
