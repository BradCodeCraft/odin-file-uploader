import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "./generated/prisma/client.js";
import express from "express";
import session from "express-session";
import path from "node:path";
import passport from "./auth/passport.js";
import indexRouter from "./routers/indexRouter.js";
import authRouter from "./routers/authRouter.js";
import { allowsAuthenticatedUsersOnly } from "./utils/middlewares.js";
import homeRouter from "./routers/homeRouter.js";

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/home", allowsAuthenticatedUsersOnly, homeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Express app is listening at http://localhost:${PORT}.`);
});
