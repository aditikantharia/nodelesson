const mongoose = require("mongoose");

let WishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productIds: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    },
  ],
});

module.exports = mongoose.model("wishlist", WishlistSchema);
