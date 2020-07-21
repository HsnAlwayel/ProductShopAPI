const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const productRoutes = require("./routes/products");

//Express instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);

//localhost:8000
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});