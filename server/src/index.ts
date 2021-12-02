require("dotenv").config();
import express from "express";
import warehousesRouter from "./routes/warehouses";
import inventoryRouter from "./routes/inventory";
import cors from "cors";
const app = express();

const PORT: string | number = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/warehouses", warehousesRouter);
app.use("/inventory", inventoryRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});