const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
let products = require("./products");
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("Hello");
    res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.post("/products", (req, res) => {
    console.log(req.body);
    const id = products[products.length - 1].id + 1;
    const newProduct = { id, ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
})

app.put("/products/:productId", (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId)
    if (foundProduct) {
        foundProduct.name = req.body.name;
        foundProduct.price = req.body.price;
        foundProduct.image = req.body.image;
        console.log(products);
        res.status(204).end();
    }
    else { res.status(404).json({ message: "Product not Found!" }); }
});

app.delete("/products/:productId", (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId)
    if (foundProduct) {
        products = products.filter((_product) => _product.id !== +productId);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Product not found!" });
    }
});
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});