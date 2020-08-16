const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
    vendorList,
    vendorCreate,
    vendorUpdate,
    vendorDelete,
    fetchVendor,
    productCreate,
} = require("../controllers/VendorController");

//Param
router.param("vendorId", async (req, res, next, vendorId) => {
    const vendor = await fetchVendor(vendorId, next);
    if (vendor) {
        req.vendor = vendor;
        next();
    } else {
        const err = new Error("Vendor Not Found");
        err.status = 404;
        next(err);
    }
});
//List
router.get("/", vendorList);

//Create
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    vendorCreate);

//Update
router.put(
    "/:vendorId",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    vendorUpdate,
);

//Delete
router.delete(
    "/:vendorId",
    passport.authenticate("jwt", { session: false }),
    vendorDelete);

//Create Product
router.post(
    "/:vendorId/products",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    productCreate);


module.exports = router;