require("dotenv").config();
import express from "express";
import warehousesRouter from "./routes/warehouses";
const app = express();

const PORT: string | number = process.env.PORT || 8000;

// GET LIST OF ALL WAREHOUSES
// GET SINGLE WAREHOUSE
// EDIT WAREHOUSE
// DELETE WAREHOUSE
// POST NEW WAREHOUSE

// GET ALL INVENTORY ITEMS
// GET SINGLE INVENTORY ITEM
// GET INVENTORY ITEMS FOR GIVEN WAREHOUSE
// POST NEW INVENTORY ITEM
// DELETE INVENTORY ITEM
// EDIT INVENTORY ITEM
app.use(express.json());
app.use("/warehouses", warehousesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
