const wishlistModel = require("../models/wishlist.model");
const productModel = require("../models/product.model");

// add or toggle item in wishlist
module.exports.AddToWishlist = async ({ userId, item }) => {
  const product = await productModel.findById(item.productId);
  if (!product) throw new Error("Product Not Found !!");

  let wishlist = await wishlistModel.findOne({ userId });
  if (!wishlist) wishlist = new wishlistModel({ userId, productIds: [] });

  const existingIndex = wishlist.productIds.findIndex(
    (val) => String(val.productId) === String(item.productId),
  );

  if (existingIndex >= 0) {
    wishlist.productIds.splice(existingIndex, 1);
  } else {
    wishlist.productIds.push({
      productId: item.productId,
      productName: product.name,
      productImage: product.images?.[0] || "",
    });
  }

  return await wishlist.save();
};

module.exports.GetWishlist = async (userId) => {
  return await wishlistModel.findOne({ userId });
};