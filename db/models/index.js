const Product = require("./Product");
const Vendor = require("./Vendor");
const User = require("./User");

Vendor.hasMany(Product, { as: "products", foreignKey: "vendorId" });

Product.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { as: "vendor", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = {
    Product,
    Vendor,
    User,
};