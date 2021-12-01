"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    res.json(warehouses);
});
router.get("/:warehouseId", (req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    const warehouse = parsedWarehouses.find((parsedWarehouse) => parsedWarehouse.id === req.params.warehouseId);
    res.json(warehouse);
});
router.put("/:warehouseId", (req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    const warehouse = parsedWarehouses.find((parsedWarehouse) => parsedWarehouse.id === req.params.warehouseId);
    warehouse.name = req.body.name;
    fs_1.default.writeFileSync("./data/warehouses.json", JSON.stringify(parsedWarehouses));
    res.send(warehouse);
});
router.delete("/:warehouseId", (req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    const filteredWarehouses = parsedWarehouses.filter((parsedWarehouse) => parsedWarehouse.id !== req.params.warehouseId);
    fs_1.default.writeFileSync("./data/warehouses.json", JSON.stringify(filteredWarehouses));
    res.send("deleted!");
});
exports.default = router;
