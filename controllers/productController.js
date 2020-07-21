let products = require("../products");
const slugify = require("slugify");

//Create
exports.productCreate = (req, res) => {
    console.log(req.body);
    const id = products[products.length - 1].id + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newProduct = { id, slug, ...req.body };
    products.push(newProduct);

    res.status(201).json(newProduct);
};

exports.productList = (req, res) => {
    res.json(products);
};

exports.productUpdate = (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId)

    if (foundProduct) {
        for (const key in req.body) foundProduct[key] = req.body[key];
        console.log(products);
        res.status(204).end();
    }
    else { res.status(404).json({ message: "Product not Found!" }); }
};
exports.productDelete = (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId)
    if (foundProduct) {
        products = products.filter((_product) => _product.id !== +productId);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Product not found!" });
    }
};
