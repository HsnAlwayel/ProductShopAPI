const { Sequelize } = require("sequelize");

const db = new Sequelize({
    username: "postgres",
    password: "99196109",
    database: "techShop",
    dialect: "postgres",
    host: "localhost",
});

module.exports = db;