import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM

const router = express.Router();

router.get("/", (_req, res) => {
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  res.send(inventory);
});

router.post("/create", (req, res) => {
  const newItem = {
    id: uuidv4(),
    warehouseId: null,
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory = JSON.parse(inventory);
  parsedInventory.push(newItem);
  fs.writeFileSync("./data/inventories.json", JSON.stringify(parsedInventory));
  res.send(newItem);
});

router.get("/:itemId", (req, res) => {
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory = JSON.parse(inventory);
  const item = parsedInventory.find(
    (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
  );
  res.send(item);
});

export default router;
