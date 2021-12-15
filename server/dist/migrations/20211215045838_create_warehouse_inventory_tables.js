"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("warehouse")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("quantity").notNullable().defaultTo(0);
            table.string("status").notNullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("inventory").dropTable("warehouse");
    });
}
exports.down = down;
