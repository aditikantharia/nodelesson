const mongoose = require("mongoose");

let ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      reuired: true,
    },
    category: {
      type: String,
      minLength: 5,
      reuired: true,
    },
    brand: {
      type: String,
      minLength: 3,
      reuired: true,
    },
    price: {
      type: Number,
      default: 0,
      minLength: 0,
      reuired: true,
    },
    discount: {
      type: Number,
      default: 0,
      minLength: 0,
    },
    stock: {
      type: Number,
      default: 0,
      minLength: 0,
      reuired: true,
    },
    image: [
      {
        type: String,
        reuired: true,
      },
    ],
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    discription: {
      type: String,
      reuired: true,
      minLength: 10,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", ProductSchema);
