const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequelizeSlugify = require("sequelize-slugify");

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
},
    {
        sequelize: db,
    }
);

SequelizeSlugify.slugifyModel(Product, {
    source: [`name`]
});

module.exports = Product;