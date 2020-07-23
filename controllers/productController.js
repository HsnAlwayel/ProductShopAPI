let products = require("../products");
const slugify = require("slugify");
const { Product } = require("../db/models.js");

//Create
exports.productCreate = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.productList = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.productUpdate = async (req, res) => {
    const { productId } = req.params;
    try {
        const foundProduct = await Product.findByPk(productId);
        if (foundProduct) {
            await foundProduct.update(req.body);
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.productDelete = async (req, res) => {
    const { productId } = req.params;
    try {
        const foundProduct = await Product.findByPk(productId);
        if (foundProduct) {
            await foundProduct.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
