import { request, response } from "express";

/**
 * @param {request} req
 * @param {response} res
 */
export function welcomePageGet(req, res) {
  res.render("index");
}
