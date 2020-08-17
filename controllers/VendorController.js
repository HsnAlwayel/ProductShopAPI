const { Vendor, Product } = require("../db/models/index.js");

//Fetch
exports.fetchVendor = async (vendorId, next) => {
    try {
        const vendor = await Vendor.findByPk(vendorId);
        return vendor;
    } catch (error) {
        next(error)
    }
};

//Vendor Create
exports.vendorCreate = async (req, res, next) => {

    try {
        const foundVendor = await Vendor.findOne({
            where: { userId: req.user.id },
        });
        if (foundVendor) {
            const err = new Error("You already have a Vendor");
            err.status = 400;
            return next(err);
        }
        if (req.file) {
            req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
                "host"
            )}/media/${req.file.filename}`;
        }

        req.body.userId = req.user.id;
        const newVendor = await Vendor.create(req.body);
        res.status(201).json(newVendor);
    } catch (error) {
        next(error);
    }
};

//Vendor List
exports.vendorList = async (req, res, next) => {
    try {
        const vendors = await Vendor.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Product,
                    as: "products",
                    attributes: ["id"],
                }
            ]
        });
        res.json(vendors);
    } catch (error) {
        next(error);
    }
};

//Vendor Update
exports.vendorUpdate = async (req, res, next) => {
    try {
        if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
            if (req.file) {
                req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
                    "host"
                )}/media/${req.file.filename}`;
            }
            await req.vendor.update(req.body);
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

//Vendor Delete
exports.vendorDelete = async (req, res, next) => {
    try {
        if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
            await req.vendor.destroy();
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

//ProductCreate
exports.productCreate = async (req, res, next) => {
    try {
        if (req.user.id === req.vendor.userId) {
            if (req.file) {
                req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
                    "host"
                )}/media/${req.file.filename}`;
            }
            req.body.vendorId = req.vendor.id;
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);
        } else {
            const err = new Error("Unauthorized");
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error);
    }
};
