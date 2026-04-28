const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productIds: [
    {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("wishlist", WishlistSchema);