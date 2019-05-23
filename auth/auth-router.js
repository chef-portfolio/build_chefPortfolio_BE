const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/user-model.js");

router.post("/register", (req, res) => {
  let users = req.body;
  const hash = bcrypt.hashSync(users.password, 10);
  users.password = hash;

  Users.add(users)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ message: "Auth line 18" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(users => {
      if (users && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(users);

        res.status(200).json({
          message: `Welcome ${
            users.username
          }!, we have been waiting for you here\'s your token...`,
          token,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Auth line 43" });
    });
});

function generateToken(users) {
  const payload = {
    subject: users.id,
    username: users.username,
    roles: ["users"]
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
