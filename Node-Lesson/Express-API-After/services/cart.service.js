const cartModel = require("../models/cart.model");

module.exports.addToCart = async ({ userId, item }) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [] });
  }

  cart.items.push(item);
  return await cart.save();
};

module.exports.getCart = async (userId) => {
  return await cartModel.find({ userId });
};

module.exports.removeSingleProduct = async ({ userId, productId }) => {
  const cart = await cartModel.findOne({ userId });

  if (!cart) {
    throw new Error("Cart Not Found");
  }


  // fetch or find index number of product
  const itemIndex = cart.items.findIndex((i) => {
    i.productId.toString() === productId;
  });


  // if product index is not avaliable into cart then show error
  if (itemIndex === 0) {
    throw new Error("Item not into Cart");
  }

  cart.items.splice(itemIndex, 1);

  return await cart.save();
};
