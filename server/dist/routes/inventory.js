"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// GET INVENTORY ITEMS FOR GIVEN WAREHOUSE
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    res.json(inventory);
});
router.get("/:itemId", (req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const item = parsedInventory.find((parsedItem) => parsedItem.id === req.params.itemId);
    res.json(item);
});
exports.default = router;
