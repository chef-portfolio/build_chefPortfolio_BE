exports.up = function(knex, Promise) {
  return knex.schema.createTable("ingredient", tbl => {
    tbl.increments();

    tbl.string("ingredient", 255);
    tbl.integer("recipe_id");
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("ingredient");
};
