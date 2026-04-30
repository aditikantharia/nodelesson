const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/db");
const wishlistModel = require("./models/wishlist.model");
const productModel = require("./models/product.model");

const fixWishlist = async () => {
  await db();
  console.log("Connected to DB...");

  const wishlists = await wishlistModel.find({});
  let fixedCount = 0;

  for (let wishlist of wishlists) {
    let modified = false;
    
    // Create a new array of valid products
    const validProductIds = [];
    
    for (let i = 0; i < wishlist.productIds.length; i++) {
      const item = wishlist.productIds[i];
      if (!item.productName) {
        try {
          // Find product to get the name
          const product = await productModel.findById(item.productId);
          if (product) {
            item.productName = product.name;
            item.productImage = product.images?.[0] || "";
            validProductIds.push(item);
            modified = true;
          } else {
            // Product doesn't exist anymore, drop it
            modified = true;
          }
        } catch (e) {
          // Invalid object ID, drop it
          modified = true;
        }
      } else {
        validProductIds.push(item);
      }
    }

    if (modified) {
      wishlist.productIds = validProductIds;
      await wishlist.save();
      fixedCount++;
      console.log(`✅ Fixed wishlist for user: ${wishlist.userId}`);
    }
  }

  console.log(`🎉 Fixed ${fixedCount} wishlists in total.`);
  process.exit(0);
};

fixWishlist().catch(console.error);
