const { Sequelize } = require("sequelize");

const db = new Sequelize({
    username: "postgres",
    password: "admin",
    database: "techShop",
    dialect: "postgres",
    host: "localhost",
    logging: false,
});

module.exports = db;