const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/admin.middleware");
const productController = require("../../controllers/product.controller");

// create product
router.post(
  "/add",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.createProduct,
);

// read all product
router.get(
  "/all",
  productController.getAllProduct,
);


// read single product
router.get(
  "/:id",
  productController.singleProduct,
);

// update product
router.put(
  "/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.updateProduct,
);

// delete single product
router.delete(
  "/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.deleteProduct,
);

module.exports = router;
