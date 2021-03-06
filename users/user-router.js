const router = require("express").Router();

const Users = require("./user-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role-middleware.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json({ message: "You shall not pass!" }));
});

router.get("/:id", restricted, checkRole("users"), (req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
