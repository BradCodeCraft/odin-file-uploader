import { request, response } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
import passport from "../auth/passport.js";
import bcrypt from "bcryptjs";

/**
 * @param {request} req
 * @param {response} res
 */
export function signUpPageGet(req, res) {
  res.render("auth/signUp");
}

const validateNewUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty.")
    .custom(async (username) => {
      const prisma = new PrismaClient();
      const users = await prisma.user.findMany();

      if (users.find((user) => user.username === username.toLowerCase()))
        throw new Error("User already exists.");
    }),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 6 characters with at least 1 lowercase and 1 uppercase character,1 number, and 1 symbol.",
    ),
];

export const signUpPagePost = [
  validateNewUser,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.render("auth/signUp", { errors: errors.array() });

    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT),
    );
    const prisma = new PrismaClient();
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
      },
    });

    res.redirect("/log-in");
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export function logInPageGet(req, res) {
  res.render("auth/logIn");
}

const validateExistingUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty.")
    .custom(async (username) => {
      const prisma = new PrismaClient();
      const users = await prisma.user.findMany();

      if (!users.find((user) => user.username === username.toLowerCase()))
        throw new Error("User does not exist.");
    }),
];
export const logInPagePost = [
  validateExistingUser,
  /**
   * @param {request} req
   * @param {response} res
   * @param {() => void} done
   */
  async (req, res, done) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/logIn", { errors: errors.array() });
    } else {
      done();
    }
  },
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/log-in",
  }),
];

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} done
 */
export async function logOutGet(req, res) {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send("Error logging out");
        } else {
          res.redirect("/log-in");
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
}
