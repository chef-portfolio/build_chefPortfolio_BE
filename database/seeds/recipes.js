exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("recipes")
    .truncate()
    .then(function() {
      return knex("recipes").insert([
        {
          title: "",
          mealType: "",
          ingredients: "",
          instructions: ""
        }
      ]);
    });
};
