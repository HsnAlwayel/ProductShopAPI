const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequelizeSlugify = require("sequelize-slugify");

class Vendor extends Model { }

Vendor.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
        },

    },
    {
        sequelize: db,
    }
);

SequelizeSlugify.slugifyModel(Vendor, {
    source: [`name`]
});

module.exports = Vendor;