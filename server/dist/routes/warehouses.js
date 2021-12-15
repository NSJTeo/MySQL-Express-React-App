"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const warehouseController = __importStar(require("../controllers/warehouseController"));
const router = express_1.default.Router();
router
    .route("/")
    .get(warehouseController.index)
    .post((req, res) => {
    const newWarehouse = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contactName: req.body.managerName,
        contactPosition: req.body.managerPosition,
        contactPhone: req.body.managerPhone,
        contactEmail: req.body.managerEmail,
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
