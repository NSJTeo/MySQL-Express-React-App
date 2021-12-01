"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    res.send(inventory);
});
router.post("/create", (req, res) => {
    const newItem = {
        id: (0, uuid_1.v4)(),
        warehouseId: null,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
    };
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    parsedInventory.push(newItem);
    fs_1.default.writeFileSync("./data/inventories.json", JSON.stringify(parsedInventory));
    res.send(newItem);
});
router.get("/:itemId", (req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const item = parsedInventory.find((parsedItem) => parsedItem.id === req.params.itemId);
    res.send(item);
});
exports.default = router;
