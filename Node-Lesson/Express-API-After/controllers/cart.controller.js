const cartService = require("../services/cart.service");

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body;

    const Exist = item.productId;
    if (Exist) {
      return res
        .status(400)
        .json({ message: "Product Already Added into Cart" });
    }

    const cart = await cartService.addToCart({ userId, item });

    if (!cart) {
      return res
        .status(400)
        .json({ message: "Can't Add To Cart Right Now !! " });
    }

    return res
      .status(200)
      .json({ message: "Item Add To Cart Successfully", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.GetCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await cartService.getCart(userId);

    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Cart Data Fatch Successfully", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.RemoveProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    await cartService.removeSingleProduct({ userId, productId });

    return res.status(200).json({message: "product Remove Successfully"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
