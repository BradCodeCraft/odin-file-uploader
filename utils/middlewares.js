import { request, response } from "express";

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} next
 */
export async function allowsAuthenticatedUsersOnly(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/log-in");
  }
}
