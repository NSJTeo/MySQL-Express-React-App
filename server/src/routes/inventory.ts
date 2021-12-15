import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import * as inventoryController from "../controllers/inventoryController";
import * as warehouseController from "../controllers/warehouseController";

const router = express.Router();

export type InventoryItem = {
  id: string;
  warehouseID: string;
  name: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
};

router
  .route("/")
  .get(inventoryController.index)
  .post((req, res) => {
    const newItem: InventoryItem = {
      id: uuidv4(),
      warehouseID: req.body.warehouseID,
      name: req.body.itemName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
    };
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: InventoryItem[] = JSON.parse(inventory);
    parsedInventory.push(newItem);
    fs.writeFileSync(
      "./data/inventories.json",
      JSON.stringify(parsedInventory)
    );
    res.send(newItem);
  });

router
  .route("/:itemId")
  .get((req, res) => {
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: InventoryItem[] = JSON.parse(inventory);
    const item: InventoryItem | undefined = parsedInventory.find(
      (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
    );
    res.send(item);
  })
  .delete((req, res) => {
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: InventoryItem[] = JSON.parse(inventory);
    const filteredInventory: InventoryItem[] = parsedInventory.filter(
      (parsedItem: InventoryItem) => parsedItem.id !== req.params.itemId
    );
    fs.writeFileSync(
      "./data/inventories.json",
      JSON.stringify(filteredInventory)
    );
    res.send("deleted!");
  })
  .put((req, res) => {
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: any = JSON.parse(inventory);
    // research this, replace any type
    let item: any = parsedInventory.find(
      (parsedItem: InventoryItem) => parsedItem.id === req.params.itemId
    );
    for (const property in req.body) {
      if (!req.body[property] && isNaN(req.body.quantity)) {
        return res.send("error!!!");
      }
      item[property] = req.body[property];
    }
    fs.writeFileSync(
      "./data/inventories.json",
      JSON.stringify(parsedInventory)
    );
    res.send(item);
  });

export default router;
