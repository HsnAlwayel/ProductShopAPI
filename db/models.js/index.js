const Product = require("./Product");
const Vendor = require("./Vendor");

Vendor.hasMany(Product, { as: "products", foreignKey: "vendorId" });

Product.belongsTo(Vendor, { as: "vendor" });
module.exports = {
    Product,
    Vendor,
};