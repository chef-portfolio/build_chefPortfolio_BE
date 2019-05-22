const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("ingredients")
    .truncate()
    .then(function() {
      return knex("ingredients").insert([
        {
          ingredient: `${faker.commerce.productMaterial()}`,
          recipe_id: 1
        },
        {
          ingredient: `${faker.commerce.productMaterial()}`,
          recipe_id: 2
        },
        {
          ingredient: `${faker.commerce.productMaterial()}`,
          recipe_id: 3
        },
        {
          ingredient: `${faker.commerce.productMaterial()}`,
          recipe_id: 4
        },
        {
          ingredient: `${faker.commerce.productMaterial()}`,
          recipe_id: 5
        }
      ]);
    });
};
