import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (_req, res) => {
  const warehouses = fs.readFileSync("./data/warehouses.json", "utf-8");
  res.json(warehouses);
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
