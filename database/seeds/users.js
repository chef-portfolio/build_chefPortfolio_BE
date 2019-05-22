const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: `${faker.internet.userName()}`,
          password: `${faker.internet.password()}`,
          location: `${faker.address.state()}`,
          contact: `${faker.phone.phoneNumber()}`,
          img_url: `${faker.image.avatar()}`
        }
      ]);
    });
};
