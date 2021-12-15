const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);
router.get("/:warehouseID/inventory", warehouseController.warehouseInventories);
router
  .route("/:warehouseID")
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;
