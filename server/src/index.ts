import * as dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import warehousesRouter from "./routes/warehouses";
import inventoryRouter from "./routes/inventory";

const app: Application = express();

const PORT = process.env.PORT || 8080;

if (!process.env.PORT) {
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use("/warehouses", warehousesRouter);
app.use("/inventory", inventoryRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
