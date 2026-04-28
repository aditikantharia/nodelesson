const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middleware/auth.middleware");
const cartController = require("../../controllers/cart.controller");

// add product into cart
router.post("/add", userMiddleware.authUser, cartController.addToCart);

// get cart
router.get("/all", userMiddleware.authUser, cartController.GetCart);

// remove product from cart
router.delete(
  "/product/:id",
  userMiddleware.authUser,
  cartController.RemoveProduct,
);



module.exports = router;
