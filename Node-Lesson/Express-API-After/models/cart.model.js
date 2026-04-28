const mongoose = require("mongoose");

let CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [{ productId: String, quantity: Number }],
  total: Number,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("cart", CartSchema)