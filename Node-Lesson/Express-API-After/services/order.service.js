const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

module.exports.PlaceOrder = async ({ userId, items }) => {
  let totalAmount = 0;

  const orderItems = [];

  for (let item of items) {
    const productId = item.productId;
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      throw new Error("product not found");
    }

    const itemsTotal = product.price * item.quantity;

    totalAmount += itemsTotal;
    


    orderItems.push({
      productId: product._id,
      quantity: item.quantity,
      price: product.price,
      total: itemsTotal,
    });
  }


  return await orderModel.create({
    userId,
    items: orderItems,
    total: totalAmount,
  });
};

module.exports.getOrder = async (userId) => {
  return await orderModel.findOne({ userId });
};
