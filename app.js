const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

let products = require("./products");

app.get("/", (req, res) => {
    console.log("Hello");
    res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.delete("/products/:productId", (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId)
    if (foundProduct) {
        products = products.filter((_product) => _product.id !== +productId);
        res.status(204).end();
    } else {
        res.status(404);
        res.json({ message: "Product not found!" });
    }
});
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});