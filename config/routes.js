const axios = require("axios");
const bcrypt = require("bcryptjs");
const Users = require("../users/user-model");
const secrets = require("../config/secrets.js");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/recipes", getRecipes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${
            user.username
          }!, we have been waiting here\'s your token, proceed with caution`,
          token
        });
      } else {
        res.status(401).json({ message: "Access Denied!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

//check
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtKey, options);
}

function getRecipes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("./database/recipes.db3", requestOptions)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Recipes", error: err });
    });
}
