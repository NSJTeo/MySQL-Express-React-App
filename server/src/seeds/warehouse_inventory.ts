import { Knex } from "knex";
import warehouseData from "../seed_data/warehouse";
import inventoryData from "../seed_data/inventory";

export async function seed(knex: Knex): Promise<void> {
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
}
