"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouse = exports.updateWarehouse = exports.addWarehouse = exports.warehouseInventories = exports.singleWarehouse = exports.index = void 0;
const knex = require("knex")(require("../knexfile").development);
// import knex from "knex";
// import development from "../knexfile";
const index = (_req, res) => {
    // knex("warehouse") is similar to SELECT * FROM warehouse (returns promise)
    knex("warehouse")
        // .select("id", "name", "manager")
        // similar to SELECT id, name, manager FROM warehouse
        .then((data) => {
        console.log(data);
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error retrieving Warehouses: ${err}`));
};
exports.index = index;
const singleWarehouse = (req, res) => {
    // SELECT * FROM warehouse WHERE id=req.params.id
    knex("warehouse")
        .where({ id: req.params.id })
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`));
};
exports.singleWarehouse = singleWarehouse;
const warehouseInventories = (req, res) => {
    // SELECT * FROM inventory WHERE warehouse_id: req.params.id
    knex("inventory")
        .where({ warehouse_id: req.params.id })
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res
        .status(400)
        .send(`Error retrieving inventories for Warehouse ${req.params.id} ${err}`));
};
exports.warehouseInventories = warehouseInventories;
const addWarehouse = (req, res) => {
    // INSERT INTO warehouse VALUES (req.body.key1, req.body.key2, ...)
    knex("warehouse")
        .insert(req.body)
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};
exports.addWarehouse = addWarehouse;
const updateWarehouse = (req, res) => {
    // UPDATE warehouse SET req.body WHERE id=req.params.id
    knex("warehouse")
        .update(req.body)
        .where({ id: req.params.id })
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`));
};
exports.updateWarehouse = updateWarehouse;
const deleteWarehouse = (req, res) => {
    // DELETE FROM warehouse WHERE id=req.params.id
    knex("warehouse")
        .delete()
        .where({ id: req.params.id })
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`));
};
exports.deleteWarehouse = deleteWarehouse;
