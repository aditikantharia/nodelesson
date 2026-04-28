const cartModel = require("../models/cart.model");

// add to cart
module.exports.addToCart = async ({ userId, item }) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) cart = new cartModel({ userId, items: [] });

  cart.items.push(item);
  return await cart.save();
};
