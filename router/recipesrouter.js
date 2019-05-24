const router = require("express").Router();

const knex = require("knex");

const db = require("../database/dbConfig");

//const db = knex(knexConfig);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const recipes = await db("recipes");

      for (let i = 0; i < recipes.length; i++) {
        let ingredient_list = await db("ingredients").where({
          "ingredients.recipe_id": recipes[i].id
        });
        recipes[i] = { ...recipes[i], ingredient_list };
      }

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({
        message: "There was an error retrieving the recipes",
        error: error
      });
    }
  })
  .post(async (req, res) => {
    try {
      const recipe = req.body;
      if (!recipe) {
        res.status(404).json({ message: "No name in body" });
      }
      const post = await db.insert(recipe).into("recipes");
      res.status(201).json({
        recipeId: post[0],
        message: "recipe post created successfully"
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await db("recipes").where({ id: id });

      if (!recipe) {
        res.status(404).json({ message: "recipe not found" });
      }

      let ingredient_list = await db("ingredients").where({
        "ingredients.recipe_id": recipe[0].id
      });

      res.status(200).json({ ...recipe[0], ingredient_list });
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
//     const { name } = req.body;
    try {
//       if (!name) {
//         res.status(400).json({ message: "No name in body" });
//       }
      const count = await db("recipes")
        .where({ id: id })
        .update(req.body);
      if (count > 0) {
        res.status(200).json({ message: "recipe was updated successfully" });
      } else {
        res.status(404).json({ message: "recipe not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating the recipe" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const count = await db("recipes")
        .where({ id: id })
        .del();
      if (count > 0) {
        res.status(200).json({ message: "recipe was removed successfully" });
      } else {
        res.status(404).json({ message: "recipe was not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error deleting recipe from the database",
        error: error
      });
    }
  });

module.exports = router;
