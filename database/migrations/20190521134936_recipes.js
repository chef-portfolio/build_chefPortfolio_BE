exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();

    tbl.string("title", 255).notNullable();
    tbl.string("mealType", 255).notNullable();
    tbl.string("ingredients", 30000000);
    tbl.string("instructions", 30000000);
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("recipes");
};
