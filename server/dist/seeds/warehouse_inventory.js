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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const warehouse_1 = __importDefault(require("../seed_data/warehouse"));
const inventory_1 = __importDefault(require("../seed_data/inventory"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.seed = seed;
