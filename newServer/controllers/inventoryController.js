const knex = require("knex")(require("../knexfile").development);

exports.index = (_req, res) => {
  // knex("inventory") is similar to SELECT * FROM inventory (returns promise)
  knex("inventory")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};
