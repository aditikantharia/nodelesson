const mongoose = require("mongoose");

let CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
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
      productPrice: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("cart", CartSchema);
