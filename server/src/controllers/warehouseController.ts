const knex = require("knex")(require("../knexfile").development);

export const index = (_req: any, res: any) => {
  // knex("warehouse") is similar to SELECT * FROM warehouse (returns promise)
  knex("warehouse")
    // .select("id", "name", "manager")
    // similar to SELECT id, name, manager FROM warehouse
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};
