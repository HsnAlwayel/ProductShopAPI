const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
    productList,
    productCreate,
    productUpdate,
    productDelete,
    fetchProduct,
} = require("../controllers/productController");

//Param
router.param("productId", async (req, res, next, productId) => {
    const product = await fetchProduct(productId, next);
    if (product) {
        req.product = product;
        next();
    } else {
        const err = new Error("Product Not Found");
        err.status = 404;
        next(err);
    }
});
//List
router.get("/", productList);

//Create
router.post("/", upload.single("image"), productCreate);

//Update
router.put("/:productId", upload.single("image"), productUpdate);

//Delete
router.delete("/:productId", productDelete);

module.exports = router;