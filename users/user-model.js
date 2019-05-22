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

async function add(user) {
  const { id } = await db("users").insert(user);

  return findById(id);
}
try {
} catch (error) {
  res.status(500).json({
    message: "Error adding id",
    error: error
  });
  function findById(id) {
    return db("users")
      .select("id", "username")
      .where({ id })
      .first();
  }
}
