"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import seed data files, arrays of objects
const inventory_1 = __importDefault(require("../seed_data/inventory"));
const warehouse_1 = __importDefault(require("../seed_data/warehouse"));
exports.seed = function (knex) {
    return knex("warehouse")
        .del()
        .then(function () {
        return knex("warehouse").insert(warehouse_1.default);
    })
        .then(() => {
        return knex("inventory").del();
    })
        .then(() => {
        return knex("inventory").insert(inventory_1.default);
    });
};
