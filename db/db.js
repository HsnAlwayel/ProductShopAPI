const { Sequelize } = require("sequelize");

const db = new Sequelize({
    username: "postgres",
    password: "draiver27",
    database: "techShop",
    dialect: "postgres",
    host: "localhost",
});

module.exports = db;