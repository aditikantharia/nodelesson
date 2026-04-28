const productModel = require("../models/product.model");

// create product
module.exports.createProduct = async ({
  name,
  category,
  brand,
  price,
  discount,
  stock,
  image,
  sku,
  discription,
}) => {
  if (
    !name ||
    !category ||
    !brand ||
    !price ||
    !stock ||
    !image ||
    !sku ||
    !discription
  ) {
    throw new Error("All Filed are Required !!");
  }

  let product = await productModel.create({
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

  return product;
};

// get single product
module.exports.singleProduct = async (id) => {
  return await productModel.findOne({ _id: id });
};

// get all products
module.exports.AllProduct = async () => {
  return await productModel.find();
};

// update product
module.exports.updateProduct = async ({
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
}) => {
  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: productId },
    { name, category, brand, price, discount, stock, image, sku, discription },
    { new: true },
  );

  if (!updatedProduct) {
    throw new Error("Product Data Not Found");
  }

  return updatedProduct;
};

// delete product
module.exports.deleteProduct = async (id) => {
  return await productModel.findOneAndDelete({ _id: id });
};
