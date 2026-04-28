const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middleware/auth.middleware");
const wishlistController = require("../../controllers/wishlist.controller")


// Add to Wishlist
router.post("/add/:id", userMiddleware.authUser, wishlistController.AddToWishlist)


// get Wishlist
router.get("/all", userMiddleware.authUser, wishlistController.GetWishlist)



// remove single item from wishlist
router.delete("/:id", userMiddleware.authUser, wishlistController.RemoveProduct)



module.exports = router