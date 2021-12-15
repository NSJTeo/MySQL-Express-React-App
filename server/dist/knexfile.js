"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const knex = {
    development: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            charset: "utf8",
        },
    },
};
exports.default = knex;
