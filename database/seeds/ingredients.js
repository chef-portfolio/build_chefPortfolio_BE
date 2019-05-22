exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("ingredients")
    .truncate()
    .then(function() {
      return knex("ingredients").insert([
        {
          ingredient: "",
          recipe_id: 1
        }
      ]);
    });
};
