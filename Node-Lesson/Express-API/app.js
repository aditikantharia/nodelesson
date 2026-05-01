const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");

// Routes
const userRouter = require("./routes/web/v1/user.route");
const adminRouter = require("./routes/web/v1/admin.route");
const productRouter = require("./routes/web/v1/product.route");
const chatRouter = require("./routes/web/v1/chat.route");
const cartRouter = require("./routes/web/v1/cart.route");
const orderRouter = require("./routes/web/v1/order.route");
const wishlistRouter = require("./routes/web/v1/wishlist.route");
const productModel = require("./models/product.model");
const userModel = require("./models/user.model");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ DB connection FIX
db()
  .then(async () => {
    try {
      const existingAdminByEmail = await userModel.findOne({ email: "admin@admin.com" });
      if (!existingAdminByEmail) {
        const hashedPassword = await userModel.hashPassword("admin123");
        await userModel.create({
          username: "admin",
          email: "admin@admin.com",
          password: hashedPassword,
          role: "admin",
        });
        console.log("✅ Default admin created: admin@admin.com / admin123");
      } else {
        console.log("ℹ️ Default admin already exists: admin@admin.com");
      }
    } catch (error) {
      console.error("❌ Default admin creation failed:", error.message);
    }
  })
  .catch((err) => console.error("❌ DB connection failed:", err.message));

// ✅ CORS FIX (MAIN ISSUE SOLVED)
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

const PORT = process.env.PORT || 3002;

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Running ✅" });
});

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/bot", chatRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/wishlist", wishlistRouter);

// Seed products (same as before)
const seedProducts = async () => {
  try {
    const count = await productModel.estimatedDocumentCount();
    if (count <= 5) {
      await productModel.deleteMany({});
      await productModel.insertMany([
        {
          name: "Smart Fitness Watch",
          description: "Track workouts, sleep, and notifications with a premium AMOLED display.",
          stock: 24,
          price: 129.99,
          discount: 20,
          isNewproduct: true,
          sku: "SKU-WATCH-001",
          images: ["https://images.unsplash.com/photo-1510552776732-7197db6d66d2?auto=format&fit=crop&w=900&q=80"],
          brand: "FitPulse",
          category: "Electronics",
        },
        {
          name: "Wireless Earbuds",
          description: "Noise-cancelling earbuds with 30 hours of battery life.",
          stock: 32,
          price: 59.99,
          discount: 10,
          isNewproduct: true,
          sku: "SKU-EARBUDS-002",
          images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"],
          brand: "SoundEdge",
          category: "Electronics",
        },
        {
          name: "Modern Sofa Chair",
          description: "Comfortable accent chair with soft fabric and curved design.",
          stock: 10,
          price: 219.99,
          discount: 0,
          isNewproduct: false,
          sku: "SKU-CHAIR-003",
          images: ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"],
          brand: "CasaHome",
          category: "Home",
        },
        {
          name: "Denim Jacket",
          description: "Classic denim jacket with a modern slim fit.",
          stock: 18,
          price: 79.99,
          discount: 15,
          isNewproduct: true,
          sku: "SKU-JACKET-004",
          images: ["https://images.unsplash.com/photo-1520975662444-72a851c7e8f0?auto=format&fit=crop&w=900&q=80"],
          brand: "DenimPro",
          category: "Fashion",
        },
        {
          name: "Yoga Mat",
          description: "Eco-friendly yoga mat with extra grip and cushioning.",
          stock: 40,
          price: 34.99,
          discount: 5,
          isNewproduct: false,
          sku: "SKU-MAT-005",
          images: ["https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"],
          brand: "ZenFlex",
          category: "Fitness",
        },
        {
          name: "Kids Building Blocks",
          description: "Creative block set for kids ages 4+ to build and play.",
          stock: 56,
          price: 24.99,
          discount: 0,
          isNewproduct: false,
          sku: "SKU-TOY-006",
          images: ["https://images.unsplash.com/photo-1600573477018-5794f2f274b2?auto=format&fit=crop&w=900&q=80"],
          brand: "ToyJoy",
          category: "Toys",
        },
        {
          name: "Leather Backpack",
          description: "Durable leather backpack with padded storage for laptop and travel essentials.",
          stock: 20,
          price: 99.99,
          discount: 0,
          isNewproduct: true,
          sku: "SKU-BAG-007",
          images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"],
          brand: "LeatherCraft",
          category: "Fashion",
        },
        {
          name: "Ceramic Table Lamp",
          description: "Modern ceramic lamp with warm ambient lighting for your living room.",
          stock: 28,
          price: 54.99,
          discount: 10,
          isNewproduct: false,
          sku: "SKU-LAMP-008",
          images: ["https://images.unsplash.com/photo-1494869048071-2b1b3a1d5fbc?auto=format&fit=crop&w=900&q=80"],
          brand: "Lumina",
          category: "Home",
        },
        {
          name: "Botanical Face Serum",
          description: "Lightweight serum infused with vitamins and botanical extracts for glowing skin.",
          stock: 46,
          price: 39.99,
          discount: 0,
          isNewproduct: true,
          sku: "SKU-BEAUTY-009",
          images: ["https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"],
          brand: "GlowNaturals",
          category: "Beauty",
        },
        {
          name: "Wireless Speaker",
          description: "Portable Bluetooth speaker with rich bass, 12-hour battery life, and waterproof shell.",
          stock: 34,
          price: 89.99,
          discount: 0,
          isNewproduct: false,
          sku: "SKU-SPEAKER-010",
          images: ["https://images.unsplash.com/photo-1517232115160-ff93364542dd?auto=format&fit=crop&w=900&q=80"],
          brand: "SoundWave",
          category: "Electronics",
        }
      ]);
      console.log("✅ Seeded default products into MongoDB");
    }
  } catch (error) {
    console.error("❌ Product seeding failed:", error.message);
  }
};

seedProducts();

app.listen(PORT, () => {
  console.log(`✅ Server is running on PORT ${PORT}`);
});