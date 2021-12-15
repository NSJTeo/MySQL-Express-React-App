const knex = require("knex")(require("../knexfile").development);
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
// import knex from "knex";
// import development from "../knexfile";

export const index = (_req: Request, res: Response) => {
  // knex("warehouse") is similar to SELECT * FROM warehouse (returns promise)
  knex("warehouse")
    // .select("id", "name", "manager")
    // similar to SELECT id, name, manager FROM warehouse
    .then((data: any) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

export const singleWarehouse = (req: Request, res: Response) => {
  // SELECT * FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .where({ id: req.params.id })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

export const warehouseInventories = (req: Request, res: Response) => {
  // SELECT * FROM inventory WHERE warehouse_id: req.params.id
  knex("inventory")
    .where({ warehouse_id: req.params.id })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};

export const addWarehouse = (req: Request, res: Response) => {
  // INSERT INTO warehouse VALUES (req.body.key1, req.body.key2, ...)
  knex("warehouse")
    .insert(req.body)
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error creating Warehouse: ${err}`)
    );
};

export const updateWarehouse = (req: Request, res: Response) => {
  // UPDATE warehouse SET req.body WHERE id=req.params.id
  knex("warehouse")
    .update(req.body)
    .where({ id: req.params.id })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

export const deleteWarehouse = (req: Request, res: Response) => {
  // DELETE FROM warehouse WHERE id=req.params.id
  knex("warehouse")
    .delete()
    .where({ id: req.params.id })
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};
