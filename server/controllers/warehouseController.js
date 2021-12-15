const knex = require("knex")(require("../knexfile").development);
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  // SELECT * FROM warehouse (returns promise)
  knex("warehouse")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

exports.singleWarehouse = (req, res) => {
  // SELECT * FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

exports.warehouseInventories = (req, res) => {
  // SELECT * FROM inventory WHERE warehouse_id: req.params.id
  knex("inventory")
    .where({ warehouseID: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};

exports.addWarehouse = (req, res) => {
  // INSERT INTO warehouse VALUES (req.body.key1, req.body.key2, ...)
  req.body.id = uuidv4();
  knex("warehouse")
    .insert(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

exports.updateWarehouse = (req, res) => {
  // UPDATE warehouse SET req.body WHERE id=req.params.id
  knex("warehouse")
    .update(req.body)
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

exports.deleteWarehouse = (req, res) => {
  // DELETE FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .delete()
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};