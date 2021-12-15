import express from "express";
import * as warehouseController from "../controllers/warehouseController";

const router = express.Router();

export interface WarehouseInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
}

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

export default router;
