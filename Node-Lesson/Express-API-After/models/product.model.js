const mongoose = require("mongoose");

let ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    category: {
      type: String,
      minLength: 5,
      required: true,
    },
    brand: {
      type: String,
      minLength: 3,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    discription: {
      type: String,
      required: true,
      minLength: 10,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", ProductSchema);
