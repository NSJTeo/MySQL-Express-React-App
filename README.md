# Setting Up The Application

## Creating, Configuring & Seeding Your Database

1. Install knex globally if you haven't already: `npm i -g knex`
2. Create a MySQL Database for this project
3. Create a .env file inside the server folder and specify MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE (the database you created in the last step)
4. Open the server folder and `cd` into the dist folder, where knexfile.js can be located
5. Run `knex migrate:latest` to create the tables for your database
6. Run `knex seed:run` to seed the tables with data from the seed_data files

## Setting up the Server

1. Open the server folder
2. Run `npm run start` to start the server
3. By default the server should run on port 8080 but this can be changed in a .env file by specifying PORT

## Setting up the Client

1. Open the client folder
2. Run `npm run start`

## No warehouse or inventory data is appearing?

Make sure MySQL is running!
