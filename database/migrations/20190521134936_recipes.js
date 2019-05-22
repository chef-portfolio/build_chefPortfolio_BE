exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();

    tbl.string("title", 255).notNullable();
    tbl.string("mealType", 255).notNullable();
    tbl.text("ingredients");
    tbl.text("instructions");
    tbl.string("img_url", 255);
    tbl.integer("chef_id");
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("recipes");
};
