// Update with your config settings.
module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/recipes.db3" }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./database/migrations",
      tableName: "recipes"
    },
    seeds: { directory: "./database/seeds" }
  }
};
