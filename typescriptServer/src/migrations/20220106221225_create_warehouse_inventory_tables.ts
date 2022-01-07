import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("warehouse", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table
        .string("contactPosition")
        .notNullable()
        .defaultTo("Warehouse Manager");
      table.string("contactName").notNullable();
      table.string("contactPhone").notNullable();
      table.string("contactEmail").notNullable();
    })
    .createTable("inventory", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("category").notNullable();
      table
        .string("warehouseID")
        .notNullable()
        .references("id")
        .inTable("warehouse")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(0);
      table.string("status").notNullable();
    });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("inventory").dropTable("warehouse");
}
