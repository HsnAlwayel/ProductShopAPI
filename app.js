const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const products = require("./products");

app.get("/", (req, res) => {
    console.log("Hello");
    res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});