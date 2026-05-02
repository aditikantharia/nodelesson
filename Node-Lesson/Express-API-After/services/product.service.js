const productModel = require("../models/product.model");

const normalizeProductPayload = ({
  name,
  category,
  brand,
  price,
  discount,
  stock,
  image,
  images,
  sku,
  discription,
  description,
}) => ({
  name,
  category,
  brand,
  price,
  discount,
  stock,
  image: Array.isArray(images) ? images : image ? [image] : [],
  sku,
  discription: description || discription,
});

// create product
module.exports.createProduct = async (payload) => {
  const normalized = normalizeProductPayload(payload);

  if (
    !normalized.name ||
    !normalized.category ||
    !normalized.brand ||
    normalized.price == null ||
    normalized.stock == null ||
    normalized.image.length === 0 ||
    !normalized.sku ||
    !normalized.discription
  ) {
    throw new Error("All fields are required !!");
  }

  let product = await productModel.create(normalized);

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
module.exports.updateProduct = async (payload) => {
  const { productId } = payload;
  const normalized = normalizeProductPayload(payload);

  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: productId },
    normalized,
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
