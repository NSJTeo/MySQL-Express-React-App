"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// import { index } from "../controllers/inventoryController";
// import {} from "../controllers/warehouseController";
const router = express_1.default.Router();
router
    .route("/")
    .get((_req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    res.send(inventory);
})
    .post((req, res) => {
    const newItem = {
        id: (0, uuid_1.v4)(),
        warehouseID: req.body.warehouseID,
        name: req.body.itemName,
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
router
    .route("/:itemId")
    .get((req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const item = parsedInventory.find((parsedItem) => parsedItem.id === req.params.itemId);
    res.send(item);
})
    .delete((req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    const filteredInventory = parsedInventory.filter((parsedItem) => parsedItem.id !== req.params.itemId);
    fs_1.default.writeFileSync("./data/inventories.json", JSON.stringify(filteredInventory));
    res.send("deleted!");
})
    .put((req, res) => {
    const inventory = fs_1.default.readFileSync("./data/inventories.json", "utf-8");
    const parsedInventory = JSON.parse(inventory);
    // research this, replace any type
    let item = parsedInventory.find((parsedItem) => parsedItem.id === req.params.itemId);
    for (const property in req.body) {
        if (!req.body[property] && isNaN(req.body.quantity)) {
            return res.send("error!!!");
        }
        item[property] = req.body[property];
    }
    fs_1.default.writeFileSync("./data/inventories.json", JSON.stringify(parsedInventory));
    res.send(item);
});
exports.default = router;
