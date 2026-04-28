const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

// add item to cart
module.exports.addToCart = async ({ userId, item }) => {
  const product = await productModel.findById(item.productId);
  if (!product) throw new Error("Product Not Found !!");

  const enrichedItem = {
    productId: item.productId,
    productName: product.name,
    productImage: product.images?.[0] || "",
    productPrice: product.price,
    quantity: item.quantity || 1,
  };

  let cart = await cartModel.findOne({ userId });

  if (!cart) cart = new cartModel({ userId, items: [] });

  cart.items.push(enrichedItem);
  return await cart.save();
};

// get Cart
module.exports.GetCart = async (userId) => {
  return await cartModel.findOne({ userId });
};

// delete single product from cart
module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
  // find login user cart
  let cart = await cartModel.findOne({ userId });

  if (!cart) throw new Error("Cart Not Found !!");

  // find index number of product based on productId
  const itemIndex = cart.items.findIndex(
    (i) => String(i.productId) === String(productId),
  );

  console.log(itemIndex);

  if (itemIndex < 0) {
    console.log(itemIndex, productId);
    throw new Error("Item not Found");
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();
};
