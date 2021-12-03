import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router
  .route("/")
  .get((_req, res) => {
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    res.send(inventory);
  })
  .post((req, res) => {
    const newItem = {
      id: uuidv4(),
      warehouseId: req.body.warehouseId,
      warehouseName: req.body.warehouseName,
      itemName: req.body.itemName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
    };
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: object[] = JSON.parse(inventory);
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
    const parsedInventory: any[] = JSON.parse(inventory);
    const item: object | undefined = parsedInventory.find(
      (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
    );
    res.send(item);
  })
  .delete((req, res) => {
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: any[] = JSON.parse(inventory);
    const filteredInventory: object | undefined = parsedInventory.filter(
      (parsedItem: { id: string }) => parsedItem.id !== req.params.itemId
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
    const parsedInventory: any[] = JSON.parse(inventory);
    let item = parsedInventory.find(
      (parsedItem: { id: string }) => parsedItem.id === req.params.itemId
    );
    for (const property in req.body) {
      if (!req.body[property]) {
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
