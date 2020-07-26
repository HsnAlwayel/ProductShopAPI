let products = require("../products");
const { Product } = require("../db/models.js");

//Create
exports.productCreate = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

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

exports.productUpdate = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const foundProduct = await Product.findByPk(productId);
        if (foundProduct) {
            await foundProduct.update(req.body);
            res.status(204).end();
        }
        else {
            const err = new Error("Product Not Found");
            err.status = 404;
            next(err);
        }
    } catch (error) {
        next(error);
    }
};
exports.productDelete = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const foundProduct = await Product.findByPk(productId);
        if (foundProduct) {
            await foundProduct.destroy();
            res.status(204).end();
        }
        else {
            const err = new Error("Product Not Found");
            err.status = 404;
            next(err);
        }
    } catch (error) {
        next(error)
    }
};
