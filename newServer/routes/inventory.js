const express = require("express");
// const uuid = require("uuid")
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.route("/").get(inventoryController.index);
// .post((req, res) => {
//   const newItem = {
//     warehouseID: req.body.warehouseID,
//     name: req.body.itemName,
//     description: req.body.description,
//     category: req.body.category,
//     status: req.body.status,
//     quantity: req.body.quantity,
//   };
//   const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
//   const parsedInventory = JSON.parse(inventory);
//   parsedInventory.push(newItem);
//   fs.writeFileSync(
//     "./data/inventories.json",
//     JSON.stringify(parsedInventory)
//   );
//   res.send(newItem);
// });

// router
//   .route("/:itemId")
//   .get((req, res) => {
//     const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
//     const parsedInventory = JSON.parse(inventory);
//     const item = parsedInventory.find(
//       (parsedItem) => parsedItem.id === req.params.itemId
//     );
//     res.send(item);
//   })
//   .delete((req, res) => {
//     const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
//     const parsedInventory = JSON.parse(inventory);
//     const filteredInventory = parsedInventory.filter(
//       (parsedItem) => parsedItem.id !== req.params.itemId
//     );
//     fs.writeFileSync(
//       "./data/inventories.json",
//       JSON.stringify(filteredInventory)
//     );
//     res.send("deleted!");
//   })
//   .put((req, res) => {
//     const inventory = fs.readFileSync("./data/inventories.json", "utf-8");
//     const parsedInventory = JSON.parse(inventory);
//     // research this, replace any type
//     let item = parsedInventory.find(
//       (parsedItem) => parsedItem.id === req.params.itemId
//     );
//     for (const property in req.body) {
//       if (!req.body[property] && isNaN(req.body.quantity)) {
//         return res.send("error!!!");
//       }
//       item[property] = req.body[property];
//     }
//     fs.writeFileSync(
//       "./data/inventories.json",
//       JSON.stringify(parsedInventory)
//     );
//     res.send(item);
//   });

module.exports = router;
