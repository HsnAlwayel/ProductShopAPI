const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

//Routes
const productRoutes = require("./routes/products");
const vendorRoutes = require("./routes/Vendors")
const userRoutes = require("./routes/users");

//Express instance
const app = express();

const path = require("path");

app.use(passport.initialize());
passport.use(localStrategy);

const run = async () => {
    try {
        await db.sync({ alter: true });
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
app.use(userRoutes);

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
