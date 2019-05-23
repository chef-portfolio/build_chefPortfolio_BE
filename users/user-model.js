const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(users) {
  await db("users").insert(users);
  return db("users")
    .select("id", "username")
    .where({ username: users.username })
    .first();
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

// try {
// } catch (error) {
//   res.status(500).json({
//     message: "Error adding id",
//     error: error
//   });
