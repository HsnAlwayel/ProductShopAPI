const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    },
},
    {
        sequelize: db,
    }
);

module.exports = Product;