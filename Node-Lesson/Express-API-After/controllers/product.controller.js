const productModel = require("../models/product.model");
const productService = require("../services/product.service");

// create product
module.exports.createProduct = async (req, res) => {
  const {
    name,
    category,
    brand,
    price,
    discount,
    stock,
    image,
    sku,
    discription,
  } = req.body;

  const exist = await productModel.findOne({ sku: sku });

  if (exist) {
    return res.status(400).json({ message: "Product Already Register" });
  }

  const product = await productService.createProduct({
    name,
    category,
    brand,
    price,
    discount,
    stock,
    image,
    sku,
    discription,
  });

  res.status(201).json({ message: "Product Created Sucessfully", product });
};

// find one product
module.exports.singleProduct = async (req, res) => {
  try {
    const product = await productService.singleProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not Found !!" });
    }

    return res
      .status(200)
      .json({ message: "Product Fetch Successfully", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get all product
module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await productService.AllProduct();

    if (!products) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Fecth All Product Sucessfully !!", products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update product
module.exports.updateProduct = async (req, res) => {
  const productId = req.params.id;

  const {
    name,
    category,
    brand,
    price,
    discount,
    stock,
    image,
    sku,
    discription,
  } = req.body;

  const updateProduct = await productService.updateProduct({
    productId,
    name,
    category,
    brand,
    price,
    discount,
    stock,
    image,
    sku,
    discription,
  });

  res
    .status(200)
    .json({ message: "Product Updated Sucessfully", updateProduct });
};

// delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productService.deleteProduct(req.params.id);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product Not Found !!" });
    }

    return res
      .status(200)
      .json({ message: "Product Deleted Sucessfully !!! " });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
