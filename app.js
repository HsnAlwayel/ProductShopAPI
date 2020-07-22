const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
//Routes
const productRoutes = require("./routes/products");

//Express instance
const app = express();

// const run = async () => {
//     try {
//         await db.authenticate();
//         console.log("Connection to the database successful!");
//     } catch (error) {
//         console.error("Error connecting to the database: ", error);
//     }

//     await app.listen(8000, () => {
//         console.log("The application is running on localhost:8000");
//     });
// };

// run();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);

//localhost:8000
app.listen(8001, () => {
    console.log("The application is running on localhost:8000");
});
