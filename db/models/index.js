const Product = require("./Product");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");

Vendor.hasMany(Product, { as: "products", foreignKey: "vendorId" });

Product.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { as: "vendor", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = {
    Product,
    Vendor,
    User,
    Order,
};