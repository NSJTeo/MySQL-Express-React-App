"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const knex = require("knex")(require("../knexfile").development);
const index = (_req, res) => {
    // knex("warehouse") is similar to SELECT * FROM warehouse (returns promise)
    knex("warehouse")
        // .select("id", "name", "manager")
        // similar to SELECT id, name, manager FROM warehouse
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((err) => res.status(400).send(`Error retrieving Warehouses: ${err}`));
};
exports.index = index;
