const Product = require("./Product");
const Vendor = require("./Vendor");
const User = require("./User");

Vendor.hasMany(Product, { as: "products", foreignKey: "vendorId" });

Product.belongsTo(Vendor, { as: "vendor" });
module.exports = {
    Product,
    Vendor,
    User,
};