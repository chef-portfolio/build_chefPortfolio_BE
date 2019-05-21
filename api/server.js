const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const configureRoutes = require("../config/routes.js");
const userRouter = require("../users/user-router.js");

const recipesRouter = require("../recipes/recipes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);
server.use("/users", userRouter);
server.use("/api/recipes", recipesRouter);
// server.post("/api/register", register);
// server.post("/api/login", login);
module.exports = server;
