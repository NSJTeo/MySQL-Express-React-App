const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);
router.get("/:warehouseId/inventory", warehouseController.warehouseInventories);
router
  .route("/:warehouseId")
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;
