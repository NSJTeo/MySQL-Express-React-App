const knex = require("knex")(require("../knexfile").development);

exports.getInventory = (_req, res) => {
  // knex("inventory") is similar to SELECT * FROM inventory (returns promise)
  knex("inventory")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventory: ${err}`));
};

exports.createInventoryItem = (req, res) => {
  knex("inventory")
    .insert(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error creating Inventory Item: ${err}`)
    );
};

exports.getItem = (req, res) => {
  knex("inventory")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving Inventory Item ${req.params.id} ${err}`)
    );
};

exports.deleteItem = (req, res) => {
  knex("inventory")
    .delete()
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error deleting Inventory Item ${req.params.id} ${err}`)
    );
};

exports.editItem = (req, res) => {
  knex("inventory")
    .update(req.body)
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error updating Inventory Item ${req.params.id} ${err}`)
    );
};
