const wishlistModel = require("../models/wishlist.model");

module.exports.AddToWishlist = async ({ userId, productId }) => {
  let wishlist = await wishlistModel.findOne({ userId });

  if (!wishlist) {
    wishlist = new wishlistModel({ userId, productIds: [] });
  }

  wishlist.productIds.push(productId);
  return await wishlist.save();
};

module.exports.GetWishlist = async (userId) => {
  return await wishlistModel.find({ userId });
};

module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
  const wishlist = await wishlistModel.findOne({ userId });

  if (!wishlist) {
    throw new Error("Wishlist Not Found !!");
  }

  let index = wishlist.productIds.findIndex((p) => {
    console.log(p);
   return p._id = productId
  });

  console.log(index)

  if (index === -1) {
    throw new Error("Can't Find Product ");
  }

  wishlist.productIds.slice(index, 1);
  return await wishlist.save();
};
