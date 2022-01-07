import { Router } from "express";
import warehouseController from "../controllers/warehouseController";

const router = Router();

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

router
  .route("/:warehouseID")
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

router.get("/:warehouseID/inventory", warehouseController.warehouseInventories);

export = router;
