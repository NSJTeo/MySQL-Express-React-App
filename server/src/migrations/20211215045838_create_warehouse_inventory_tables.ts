import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("warehouse", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table
        .string("manager_position")
        .notNullable()
        .defaultTo("Warehouse Manager");
      table.string("manager_name").notNullable();
      table.string("manager_phone").notNullable();
      table.string("manager_email").notNullable();
    })
    .createTable("inventory", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("category").notNullable();
      table
        .integer("warehouse_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("warehouse")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(0);
      table.string("status").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("inventory").dropTable("warehouse");
}
