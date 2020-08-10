const { Product, Vendor } = require("../db/models/index.js");
const { model } = require("../db/db.js");

//Fetch
exports.fetchProduct = async (productId) => {
    try {
        const product = await Product.findByPk(productId);
        return product;
    } catch (error) {
        next(error)
    }
};



//List
exports.productList = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
                model: Vendor,
                as: "vendor",
                attributes: ["name"],
            }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

//Update
exports.productUpdate = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get("host")}/media/${
                req.file.filename
                }`;
        }
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
