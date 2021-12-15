require("dotenv").config();
const express = require("express");
const app = express();
const warehousesRouter = require("./routes/warehouses");
const inventoryRouter = require("./routes/inventory");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/warehouses", warehousesRouter);
app.use("/inventory", inventoryRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
