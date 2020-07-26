const express = require("express");
const router = express.Router();


const {
    productList,
    productCreate,
    productUpdate,
    productDelete,
} = require("../controllers/productController");

//list
router.get("/", productList);

//Create
router.post("/", productCreate);

//Update
router.put("/:productId", productUpdate);

//Delete
router.delete("/:productId", productDelete);

module.exports = router;