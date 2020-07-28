const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const { Product } = require("./db/models.js");

//Routes
const productRoutes = require("./routes/products");
const vendorRoutes = require("./routes/Vendors")

//Express instance
const app = express();

const path = require("path");

const run = async () => {
    try {
        await db.sync();
        console.log("Connection to the database successful!");
    } catch (error) {

        console.error("Error connecting to the database: ", error);
    }

    await app.listen(8000, () => {
        console.log("The application is running on localhost:8000");
    });
};

run();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log("im a middleware method");
    next();
});

//Routers Use
app.use("/vendors", vendorRoutes);
app.use("/products", productRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// No Path Found
app.use((req, res, next) => {
    res.status(404).json("Path not found");
})
//Error Handeling MiddleWare
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message || "internal Server Error"
    });
});



//localhost:8000
app.listen(8001, () => {
    console.log("The application is running on localhost:8000");
});
