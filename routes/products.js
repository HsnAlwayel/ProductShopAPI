const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
    productList,
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

//Update
router.put("/:productId", passport.authenticate("jwt", { session: false }),
    upload.single("image"), productUpdate);

//Delete
router.delete("/:productId", passport.authenticate("jwt", { session: false }),
    productDelete);

module.exports = router;