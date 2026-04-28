const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middlewares/user.middleware")
const cartController = require("../../controllers/cart.controller")

// add items to cart
router.post("/add", userMiddleware.authUser, cartController.AddToCart)

// get all items from cart


// remove single item from cart




module.exports = router;