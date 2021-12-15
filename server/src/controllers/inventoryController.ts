const knex = require("knex")(require("../knexfile").development);
import { Request, Response } from "express";

// export default "";

export const index = (_req: Request, res: Response) => {
  // knex("inventory") is similar to SELECT * FROM inventory (returns promise)
  knex("inventory")
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};
