"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router
    .route("/")
    .get((_req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    res.send(warehouses);
})
    .post((req, res) => {
    const contactInfo = {
        name: req.body.contact.name,
        position: req.body.contact.position,
        phone: req.body.contact.phone,
        email: req.body.contact.email,
    };
    const newWarehouse = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: contactInfo,
    };
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    parsedWarehouses.push(newWarehouse);
    fs_1.default.writeFileSync("./data/warehouses.json", JSON.stringify(parsedWarehouses));
    res.send(newWarehouse);
});
router.get("/:warehouseId/inventory", (req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const filteredInventory = parsedInventory.filter((item) => item.warehouseID === req.params.warehouseId);
    res.send(filteredInventory);
});
router
    .route("/:warehouseId")
    .get((req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    const warehouse = parsedWarehouses.find((parsedWarehouse) => parsedWarehouse.id === req.params.warehouseId);
    res.send(warehouse);
})
    .put((req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    let warehouse = parsedWarehouses.find((parsedWarehouse) => parsedWarehouse.id === req.body.id);
    for (const property in req.body) {
        if (!req.body[property]) {
            return res.send("error!!!");
        }
        warehouse[property] = req.body[property];
    }
    fs_1.default.writeFileSync("./data/warehouses.json", JSON.stringify(parsedWarehouses));
    res.send(warehouse);
})
    .delete((req, res) => {
    const warehouses = fs_1.default.readFileSync("./data/warehouses.json", "utf-8");
    const parsedWarehouses = JSON.parse(warehouses);
    const filteredWarehouses = parsedWarehouses.filter((parsedWarehouse) => {
        return parsedWarehouse.id !== req.params.warehouseId;
    });
    fs_1.default.writeFileSync("./data/warehouses.json", JSON.stringify(filteredWarehouses));
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const filteredInventory = parsedInventory.filter((parsedInventoryItem) => {
        return parsedInventoryItem.warehouseID !== req.params.warehouseId;
    });
    fs_1.default.writeFileSync("./data/inventories.json", JSON.stringify(filteredInventory));
    res.send("deleted!");
});
exports.default = router;
