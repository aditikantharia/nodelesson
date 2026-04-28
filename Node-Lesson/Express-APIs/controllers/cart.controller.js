const cartService = require("../services/cart.service");
const cartModel = require("../models/cart.model");

// Add To Cart
module.exports.AddToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body;

    const Exist = await cartModel.findOne({ userId });
    if (Exist) {
      const existProduct = Exist.items.map((val) => {
        const ids = val.productId;
        return ids;
      });

      existProduct.forEach((e) => {
        if (e.equals(item.productId)) {
          return res.status(400).json({ message: "Product Already Into Cart" });
        }
      });
    }

    const cart = await cartService.addToCart({ userId, item });

    return res
      .status(200)
      .json({ message: "Add item to cart Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
