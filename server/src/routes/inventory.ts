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
  const inventory: string = fs.readFileSync("./data/inventories.json", "utf-8");
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
  const inventory: string = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory: object[] = JSON.parse(inventory);
  parsedInventory.push(newItem);
  fs.writeFileSync("./data/inventories.json", JSON.stringify(parsedInventory));
  res.send(newItem);
});

router.get("/:itemId", (req, res) => {
  const inventory: string = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory: any[] = JSON.parse(inventory);
  const item: object | undefined = parsedInventory.find(
    (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
  );
  res.send(item);
});

router.delete("/:itemId", (req, res) => {
  const inventory: string = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory: any[] = JSON.parse(inventory);
  const filteredInventory: object | undefined = parsedInventory.filter(
    (parsedItem: { id: string }) => parsedItem.id !== req.params.itemId
  );
  fs.writeFileSync(
    "./data/inventories.json",
    JSON.stringify(filteredInventory)
  );
  res.send("deleted!");
});

router.put("/:itemId", (req, res) => {
  const inventory: string = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory: any[] = JSON.parse(inventory);
  let item = parsedInventory.find(
    (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
  );
  for (const property in req.body) {
    if (!req.body[property].trim()) {
      return res.send("error!!!");
    }
    item[property] = req.body[property];
  }
  fs.writeFileSync("./data/inventories.json", JSON.stringify(parsedInventory));
  res.send(item);
});

export default router;
