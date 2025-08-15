import { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "../generated/prisma/client.js";
import bcrypt from "bcryptjs";

const passport = new Passport();
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.findFirst({
        where: {
          username: username.toLowerCase(),
        },
      });
      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
