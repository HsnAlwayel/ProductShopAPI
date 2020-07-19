const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const products = require("./products");

app.get("/", (request, respond) => {
    console.log("Hello");
    respond.json({ message: "Hello World" });
});

app.get("/products", (request, respond) => {
    respond.json(products);
});

app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});