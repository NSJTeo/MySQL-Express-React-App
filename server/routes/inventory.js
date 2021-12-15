const express = require("express");
// const uuid = require("uuid")
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router
  .route("/")
  .get(inventoryController.getInventory)
  .post(inventoryController.createInventoryItem);

router
  .route("/itemID")
  .get(inventoryController.getItem)
  .delete(inventoryController.deleteItem)
  .put(inventoryController.editItem);

module.exports = router;
