const knex = require("knex")(require("../knexfile").development);
import { Request, Response } from "express";
import { MysqlError } from "mysql";
const { v4: uuidv4 } = require("uuid");

// Update name here & in routes
exports.index = (_req: Request, res: Response) => {
  // SELECT * FROM warehouse (returns promise)
  knex("warehouse")
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

// update name here & in routes
exports.singleWarehouse = (req: Request, res: Response) => {
  // SELECT * FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .where({ id: req.params.warehouseID })
    .then((data: any) => {
      res.status(200).send(data[0]);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

// update name here & in routes
exports.warehouseInventories = (req: Request, res: Response) => {
  // SELECT * FROM inventory WHERE warehouse_id: req.params.id
  knex("inventory")
    .where({ warehouseID: req.params.warehouseID })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: MysqlError) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};

// update name, validation needed
exports.addWarehouse = (req: Request, res: Response) => {
  // INSERT INTO warehouse VALUES (req.body.key1, req.body.key2, ...)
  req.body.id = uuidv4();
  knex("warehouse")
    .insert(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error creating Warehouse: ${err}`)
    );
};

// update name, validation needed
exports.updateWarehouse = (req: Request, res: Response) => {
  // UPDATE warehouse SET req.body WHERE id=req.params.id
  knex("warehouse")
    .update(req.body)
    .where({ id: req.params.warehouseID })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

exports.deleteWarehouse = (req: Request, res: Response) => {
  // DELETE FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .delete()
    .where({ id: req.params.warehouseID })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};

export = exports;
