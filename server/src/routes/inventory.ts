import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// GET INVENTORY ITEMS FOR GIVEN WAREHOUSE
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM

const router = express.Router();

router.get("/", (_req, res) => {
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  res.json(inventory);
});

router.get("/:itemId", (req, res) => {
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory = JSON.parse(inventory);
  const item = parsedInventory.find(
    (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
  );
  res.json(item);
});

export default router;
