import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { InventoryItem } from "./inventory";
import * as inventoryController from "../controllers/inventoryController";
import * as warehouseController from "../controllers/warehouseController";

const router = express.Router();

type WarehouseInfo = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
};

router
  .route("/")
  .get(warehouseController.index)
  .post((req, res) => {
    const newWarehouse: WarehouseInfo = {
      id: uuidv4(),
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contactName: req.body.managerName,
      contactPosition: req.body.managerPosition,
      contactPhone: req.body.managerPhone,
      contactEmail: req.body.managerEmail,
    };

    const warehouses: string = fs.readFileSync(
      "./data/warehouses.json",
      "utf-8"
    );
    const parsedWarehouses: WarehouseInfo[] = JSON.parse(warehouses);
    parsedWarehouses.push(newWarehouse);
    fs.writeFileSync(
      "./data/warehouses.json",
      JSON.stringify(parsedWarehouses)
    );
    res.send(newWarehouse);
  });

router.get("/:warehouseId/inventory", (req, res) => {
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory: InventoryItem[] = JSON.parse(inventory);
  const filteredInventory: InventoryItem[] = parsedInventory.filter(
    (item) => item.warehouseID === req.params.warehouseId
  );
  res.send(filteredInventory);
});

router
  .route("/:warehouseId")
  .get((req, res) => {
    const warehouses: string = fs.readFileSync(
      "./data/warehouses.json",
      "utf-8"
    );
    const parsedWarehouses: WarehouseInfo[] = JSON.parse(warehouses);
    const warehouse: WarehouseInfo | undefined = parsedWarehouses.find(
      (parsedWarehouse: { id: string }) =>
        parsedWarehouse.id === req.params.warehouseId
    );
    res.send(warehouse);
  })
  .put((req: any, res) => {
    const warehouses: string = fs.readFileSync(
      "./data/warehouses.json",
      "utf-8"
    );
    const parsedWarehouses: any = JSON.parse(warehouses);
    let warehouse = parsedWarehouses.find(
      (parsedWarehouse: any) => parsedWarehouse.id === req.body.id
    );
    for (const property in req.body) {
      if (!req.body[property]) {
        return res.send("error!!!");
      }
      warehouse[property] = req.body[property];
    }
    fs.writeFileSync(
      "./data/warehouses.json",
      JSON.stringify(parsedWarehouses)
    );
    res.send(warehouse);
  })
  .delete((req, res) => {
    const warehouses: string = fs.readFileSync(
      "./data/warehouses.json",
      "utf-8"
    );
    const parsedWarehouses: WarehouseInfo[] = JSON.parse(warehouses);
    const filteredWarehouses: WarehouseInfo[] = parsedWarehouses.filter(
      (parsedWarehouse: any) => {
        return parsedWarehouse.id !== req.params.warehouseId;
      }
    );
    fs.writeFileSync(
      "./data/warehouses.json",
      JSON.stringify(filteredWarehouses)
    );
    const inventory: string = fs.readFileSync(
      "./data/inventories.json",
      "utf-8"
    );
    const parsedInventory: InventoryItem[] = JSON.parse(inventory);
    const filteredInventory: InventoryItem[] = parsedInventory.filter(
      (parsedInventoryItem: any) => {
        return parsedInventoryItem.warehouseID !== req.params.warehouseId;
      }
    );
    fs.writeFileSync(
      "./data/inventories.json",
      JSON.stringify(filteredInventory)
    );
    res.send("deleted!");
  });

export default router;
