const router = require("express").Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./database/recipes.db3"
  }
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("recipes")
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db("recipes")
    .where({ id: req.params.id })
    .first()
    .then(recipes => {
      if (recipes) {
        res.status(200).json(recipes);
      } else {
        res.status(404).json({ message: "Recipe not found!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", async (req, res) => {
  try {
    const [id] = await db("recipes").insert(req.body);
    const recipes = await db("recipes")
      .where({ id })
      .first();
    res.status(201).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "There was an error posting that!" });
  }
});

router.put("/:id", (req, res) => {
  db("recipes")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("recipes")
          .where({ id: req.params.id })
          .first()
          .then(recipes => {
            res.status(200).json(recipes);
          });
      } else {
        res.status(404).json({ message: "Recipe not found!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("recipes")
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
      if (count > 0) {
        db("recipes")
          .where({ id: req.params.id })
          .first()
          .then(recipes => {
            res.status(200).json(recipes);
          });
      } else {
        res.status(404).json({ message: "Recipe not found!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
