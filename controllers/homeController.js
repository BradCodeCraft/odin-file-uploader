import { request, response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { createClient } from "@supabase/supabase-js";

/**
 * @param {request} req
 * @param {response} res
 */
export async function homePageGet(req, res) {
  try {
    const prisma = new PrismaClient();
    const folders = await prisma.folder.findMany({
      where: {
        authorId: parseInt(req.user.id),
      },
    });
    const files = await prisma.file.findMany({
      where: {
        authorId: parseInt(req.user.id),
      },
    });

    res.render("home", { folders: folders, files: files, user: req.user });
  } catch (e) {
    console.error(e);
  }
}
