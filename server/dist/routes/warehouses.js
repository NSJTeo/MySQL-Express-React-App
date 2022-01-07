"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const warehouseController_1 = __importDefault(require("../controllers/warehouseController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(warehouseController_1.default.index)
    .post(warehouseController_1.default.addWarehouse);
router
    .route("/:warehouseID")
    .get(warehouseController_1.default.singleWarehouse)
    .put(warehouseController_1.default.updateWarehouse)
    .delete(warehouseController_1.default.deleteWarehouse);
router.get("/:warehouseID/inventory", warehouseController_1.default.warehouseInventories);
module.exports = router;
