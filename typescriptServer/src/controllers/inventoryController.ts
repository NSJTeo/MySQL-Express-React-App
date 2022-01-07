const knex = require("knex")(require("../knexfile").development);
import { Request, Response } from "express";
import { MysqlError } from "mysql";
const { v4: uuidv4 } = require("uuid");

exports.getInventory = (_req: Request, res: Response) => {
  knex("inventory")
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error retrieving Inventory: ${err}`)
    );
};

exports.createInventoryItem = (req: Request, res: Response) => {
  // validation needed
  req.body.id = uuidv4();
  knex("inventory")
    .insert(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: MysqlError) =>
      res.status(400).send(`Error creating Inventory Item: ${err}`)
    );
};

exports.getItem = (req: Request, res: Response) => {
  knex("inventory")
    .where({ id: req.params.itemID })
    .then((data: any) => {
      res.status(200).send(data[0]);
    })
    .catch((err: MysqlError) =>
      res
        .status(400)
        .send(`Error retrieving Inventory Item ${req.params.id} ${err}`)
    );
};

exports.deleteItem = (req: Request, res: Response) => {
  knex("inventory")
    .delete()
    .where({ id: req.params.itemID })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: MysqlError) =>
      res
        .status(400)
        .send(`Error deleting Inventory Item ${req.params.id} ${err}`)
    );
};

exports.editItem = (req: Request, res: Response) => {
  // validation needed
  knex("inventory")
    .update(req.body)
    .where({ id: req.params.itemID })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: MysqlError) =>
      res
        .status(400)
        .send(`Error updating Inventory Item ${req.params.id} ${err}`)
    );
};

export = exports;
