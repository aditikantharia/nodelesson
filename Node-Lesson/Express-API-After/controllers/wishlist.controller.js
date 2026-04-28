const wishlistService = require("../services/wishlist.service");

module.exports.AddToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const wishlist = await wishlistService.AddToWishlist({ userId, productId });

    if (!wishlist) {
      return res.status(404).json({ message: "Product Not Found !!!" });
    }

    return res
      .status(200)
      .json({ message: "Product Add into Wishlist Successfully", wishlist });
  } catch (error) {
    return res.status(400).json({ messgae: error.message });
  }
};

module.exports.GetWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await wishlistService.GetWishlist(userId);

    if (!wishlist) {
      return res.status(404).json({ message: "Whishlist Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Wishlist Data Fetch Successfully", wishlist });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.RemoveProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    let wishlist = await wishlistService.RemoveSingleProduct({
      userId,
      productId,
    });

    if(!wishlist){
        return res.status(404).json("Product Not Found");
    }

    return res.status(200).json({message: "Product Remove Successfully"})
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
