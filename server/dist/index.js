"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const warehouses_1 = __importDefault(require("./routes/warehouses"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/warehouses", warehouses_1.default);
app.use("/inventory", inventory_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
