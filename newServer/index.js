require("dotenv").config();
const app = require("express")();
const warehousesRouter = require("./routes/warehouses");
const inventoryRouter = require("./routes/inventory");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
