// import seed data files, arrays of objects
import inventoryData from "../seed_data/inventory";
import warehouseData from "../seed_data/warehouse";
import { Knex } from "knex";

exports.seed = function (knex: Knex) {
  return knex("warehouse")
    .del()
    .then(function () {
      return knex("warehouse").insert(warehouseData);
    })
    .then(() => {
      return knex("inventory").del();
    })
    .then(() => {
      return knex("inventory").insert(inventoryData);
    });
};
