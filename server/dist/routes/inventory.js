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
const inventoryController = __importStar(require("../controllers/inventoryController"));
const router = express_1.default.Router();
router
    .route("/")
    .get(inventoryController.index)
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
