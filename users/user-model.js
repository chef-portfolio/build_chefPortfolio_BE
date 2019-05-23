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
  const { id } = await db("users").insert(users);
  return findById(id);
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
