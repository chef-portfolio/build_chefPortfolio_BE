const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//const configureRoutes = require("../config/routes.js");

const userRouter = require("../users/user-router");
const recipesRouter = require("../router/recipesrouter");
const ingredientsRouter = require("../router/ingredientsrouter");

//const register = require("../config/routes.js");
//const login = require("../config/routes");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//configureRoutes(server);
server.use("/users", userRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);
//server.use("/api/register", register);
//server.use("/api/login", login);
module.exports = server;
