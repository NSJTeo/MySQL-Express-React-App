"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const warehouses_1 = __importDefault(require("./routes/warehouses"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// GET LIST OF ALL WAREHOUSES
// GET SINGLE WAREHOUSE
// EDIT WAREHOUSE
// DELETE WAREHOUSE
// POST NEW WAREHOUSE
// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// GET INVENTORY ITEMS FOR GIVEN WAREHOUSE
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM
app.use(express_1.default.json());
app.use("/warehouses", warehouses_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
