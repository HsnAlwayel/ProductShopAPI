const { Product, Vendor } = require("../db/models/index.js");
const { model } = require("../db/db.js");

//Fetch
exports.fetchProduct = async (productId) => {
    try {
        const product = await Product.findByPk(productId, {
            include: {
                model: Vendor,
                as: "vendor",
                attributes: ["userId"]
            }
        });
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
        if (req.user && req.user.id === req.product.vendor.userId) {
            if (req.file) {
                req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
                    "host"
                )}/media/${req.file.filename}`;
            }
            await req.product.update(req.body);
            res.status(204).end();
        } else {
            const err = new Error("Unauthorized");
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error)
    }
};

//Delete
exports.productDelete = async (req, res, next) => {
    try {
        if (req.user && req.user.id === req.product.vendor.userId) {
            await req.product.destroy();
            res.status(204).end();
        } else {
            const err = new Error("Unauthorized");
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error)
    }
};
