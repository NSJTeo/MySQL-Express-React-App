import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const config = {
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

export = config;
