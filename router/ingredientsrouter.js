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

// endpoints here
router
  .route("/")
  .get(async (req, res) => {
    try {
      const ingredients = await db("ingredients");
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({
        message: "There was an error retrieving the ingredients",
        error: error
      });
    }
  })
  .post(async (req, res) => {
    try {
      const ingredient = req.body;
      if (!ingredient) {
        res.status(404).json({ message: "No name in body" });
      }
      const post = await db.insert(ingredient).into("ingredients");
      res.status(201).json({
        ingredientId: post[0],
        message: "ingredient post created successfully"
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const ingredient = await db("ingredients").where({ id: id });
    try {
      if (!ingredient) {
        res.status(404).json({ message: "ingredient not found" });
      }
      res.status(200).json(ingredient[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      if (!name) {
        res.status(400).json({ message: "No name in body" });
      }
      const count = await db("ingredients")
        .where({ id: id })
        .update({ name });
      if (count > 0) {
        res
          .status(200)
          .json({ message: "ingredient was updated successfully" });
      } else {
        res.status(404).json({ message: "ingredient not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating the ingredient" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const count = await db("ingredients")
        .where({ id: id })
        .del();
      if (count > 0) {
        res
          .status(200)
          .json({ message: "ingredient was removed successfully" });
      } else {
        res.status(404).json({ message: "ingredient was not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error deleting ingredient from the database",
        error: error
      });
    }
  });

module.exports = router;
