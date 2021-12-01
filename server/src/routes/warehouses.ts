import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (_req, res) => {
  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  res.json(warehouses);
});

router.post("/", (req, res) => {
  const contactInfo = {
    name: req.body.contact.name,
    position: req.body.contact.position,
    phone: req.body.contact.phone,
    email: req.body.contact.email,
  };

  const newWarehouse = {
    id: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: contactInfo,
  };

  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  const parsedWarehouses = JSON.parse(warehouses);
  parsedWarehouses.push(newWarehouse);
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(parsedWarehouses));
  res.send(newWarehouse);
});

router.get("/:warehouseId", (req, res) => {
  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  const parsedWarehouses = JSON.parse(warehouses);
  const warehouse = parsedWarehouses.find(
    (parsedWarehouse: { id: string }) =>
      parsedWarehouse.id === req.params.warehouseId
  );
  res.json(warehouse);
});

router.get("/:warehouseId/inventory", (req, res) => {
  console.log(req.params);
  const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
  const parsedInventory = JSON.parse(inventory);
  const filteredInventory = parsedInventory.filter(
    (item: { warehouseID: string }) =>
      item.warehouseID === req.params.warehouseId
  );
  res.json(filteredInventory);
});

router.put("/:warehouseId", (req, res) => {
  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  const parsedWarehouses = JSON.parse(warehouses);
  const warehouse = parsedWarehouses.find(
    (parsedWarehouse: { id: string }) =>
      parsedWarehouse.id === req.params.warehouseId
  );
  warehouse.name = req.body.name;
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(parsedWarehouses));
  res.send(warehouse);
});

router.delete("/:warehouseId", (req, res) => {
  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  const parsedWarehouses = JSON.parse(warehouses);
  const filteredWarehouses = parsedWarehouses.filter(
    (parsedWarehouse: { id: string }) =>
      parsedWarehouse.id !== req.params.warehouseId
  );
  fs.writeFileSync(
    "./data/warehouses.json",
    JSON.stringify(filteredWarehouses)
  );
  res.send("deleted!");
});

export default router;
