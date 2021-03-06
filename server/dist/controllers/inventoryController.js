"use strict";
const knex = require("knex")(require("../knexfile").development);
const { v4: uuidv4 } = require("uuid");
exports.getInventory = (_req, res) => {
    knex("inventory")
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error retrieving Inventory: ${err}`));
};
exports.createInventoryItem = (req, res) => {
    // validation needed
    req.body.id = uuidv4();
    knex("inventory")
        .insert(req.body)
        .then(() => {
        res.sendStatus(201);
    })
        .catch((err) => res.status(400).send(`Error creating Inventory Item: ${err}`));
};
exports.getItem = (req, res) => {
    knex("inventory")
        .where({ id: req.params.itemID })
        .then((data) => {
        res.status(200).send(data[0]);
    })
        .catch((err) => res
        .status(400)
        .send(`Error retrieving Inventory Item ${req.params.id} ${err}`));
};
exports.deleteItem = (req, res) => {
    knex("inventory")
        .delete()
        .where({ id: req.params.itemID })
        .then(() => {
        res.sendStatus(200);
    })
        .catch((err) => res
        .status(400)
        .send(`Error deleting Inventory Item ${req.params.id} ${err}`));
};
exports.editItem = (req, res) => {
    // validation needed
    knex("inventory")
        .update(req.body)
        .where({ id: req.params.itemID })
        .then(() => {
        res.sendStatus(201);
    })
        .catch((err) => res
        .status(400)
        .send(`Error updating Inventory Item ${req.params.id} ${err}`));
};
module.exports = exports;
