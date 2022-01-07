"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(inventoryController_1.default.getInventory)
    .post(inventoryController_1.default.createInventoryItem);
router
    .route("/:itemID")
    .get(inventoryController_1.default.getItem)
    .delete(inventoryController_1.default.deleteItem)
    .put(inventoryController_1.default.editItem);
module.exports = router;
