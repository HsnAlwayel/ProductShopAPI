const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
    vendorList,
    vendorCreate,
    vendorUpdate,
    vendorDelete,
    fetchVendor,
    productCreate,
} = require("../controllers/vendorController");

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
router.post("/", upload.single("image"), vendorCreate);

//Update
router.put("/:vendorId", upload.single("image"), vendorUpdate);

//Delete
router.delete("/:vendorId", vendorDelete);

//Create Product
router.post("/:vendorId/products", upload.single("image"), productCreate);


module.exports = router;