const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router");
const recipesRouter = require("../router/recipesrouter");
const ingredientsRouter = require("../router/ingredientsrouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);

server.get("/", (req, res) => {
  res.send("API running!");
});

module.exports = server;
