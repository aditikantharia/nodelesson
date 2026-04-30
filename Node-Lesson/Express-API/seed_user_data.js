const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const userModel = require("./models/user.model");
const productModel = require("./models/product.model");
const cartModel = require("./models/cart.model");
const wishlistModel = require("./models/wishlist.model");

dotenv.config();

const seedUserData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("📊 Mongodb Connected for seeding user data");

    // Clear old test data
    await userModel.deleteMany({ email: "testuser@ecommerce.com" });

    // 1. Create a Test User
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("password123", salt);

    const testUser = await userModel.create({
      username: "Test User",
      email: "testuser@ecommerce.com",
      password: hashPassword,
      role: "user"
    });
    console.log(`✅ Created test user: ${testUser.email}`);

    // 2. Fetch some products to add
    const products = await productModel.find().limit(3);

    if (products.length === 0) {
      console.log("❌ No products found! Run seed_bulk.js first.");
      process.exit(1);
    }

    // 3. Create a Cart for the Test User
    const cartItems = products.slice(0, 2).map((product) => ({
      productId: product._id.toString(),
      productName: product.name,
      productImage: product.images?.[0] || "",
      productPrice: product.price,
      quantity: 2
    }));

    await cartModel.create({
      userId: testUser._id,
      items: cartItems
    });
    console.log(`✅ Created cart with ${cartItems.length} items (with productName included!)`);

    // 4. Create a Wishlist for the Test User
    const wishlistItems = products.slice(1, 3).map((product) => ({
      productId: product._id.toString(),
      productName: product.name,
      productImage: product.images?.[0] || "",
      productPrice: product.price
    }));

    await wishlistModel.create({
      userId: testUser._id,
      productIds: wishlistItems
    });
    console.log(`✅ Created wishlist with ${wishlistItems.length} items (with productName included!)`);

    console.log("🎉 Data successfully inserted! You can check MongoDB Compass now.");
    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding user data failed:", error);
    process.exit(1);
  }
};

seedUserData();
