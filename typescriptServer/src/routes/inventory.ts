import { Router } from "express";
import inventoryController from "../controllers/inventoryController";

const router = Router();

router
  .route("/")
  .get(inventoryController.getInventory)
  .post(inventoryController.createInventoryItem);

router
  .route("/:itemID")
  .get(inventoryController.getItem)
  .delete(inventoryController.deleteItem)
  .put(inventoryController.editItem);

export = router;
