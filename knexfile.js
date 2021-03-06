// Update with your config settings.
module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/recipes.db3" }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./database/migrations",
      tableName: "users",
      tableName: "recipes",
      tableName: "ingredients"
    },
    seeds: { directory: "./database/seeds" }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
