let products = require("../products");
const { Product } = require("../db/models.js");

//Fetch
exports.fetchProduct = async (productId) => {
    try {
        const product = await Product.findByPk(productId);
        return product;
    } catch (error) {
        next(error)
    }
};

//Create
exports.productCreate = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

//List
exports.productList = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

//Update
exports.productUpdate = async (req, res, next) => {
    try {
        await req.product.update(req.body);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//Delete
exports.productDelete = async (req, res, next) => {
    try {
        await req.product.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};
