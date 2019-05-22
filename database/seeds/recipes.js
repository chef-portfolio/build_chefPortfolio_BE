const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("recipes")
    .truncate()
    .then(function() {
      return knex("recipes").insert([
        {
          title: `${faker.commerce.productName()}`,
          mealType: `${faker.commerce.product()}`,
          ingredients: `${faker.commerce.productMaterial()}`,
          instructions: `${faker.lorem.paragraph()}`,
          chef_id: 1
        },
        {
          title: `${faker.commerce.productName()}`,
          mealType: `${faker.commerce.product()}`,
          ingredients: `${faker.commerce.productMaterial()}`,
          instructions: `${faker.lorem.paragraph()}`,
          chef_id: 2
        },
        {
          title: `${faker.commerce.productName()}`,
          mealType: `${faker.commerce.product()}`,
          ingredients: `${faker.commerce.productMaterial()}`,
          instructions: `${faker.lorem.paragraph()}`,
          chef_id: 3
        },
        {
          title: `${faker.commerce.productName()}`,
          mealType: `${faker.commerce.product()}`,
          ingredients: `${faker.commerce.productMaterial()}`,
          instructions: `${faker.lorem.paragraph()}`,
          chef_id: 4
        },
        {
          title: `${faker.commerce.productName()}`,
          mealType: `${faker.commerce.product()}`,
          ingredients: `${faker.commerce.productMaterial()}`,
          instructions: `${faker.lorem.paragraph()}`,
          chef_id: 5
        }
      ]);
    });
};
