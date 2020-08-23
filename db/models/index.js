const Product = require("./Product");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Vendor.hasMany(Product, { as: "products", foreignKey: "vendorId" });

Product.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { as: "vendor", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });

module.exports = {
    Product,
    Vendor,
    User,
    Order,
    OrderItem,
};