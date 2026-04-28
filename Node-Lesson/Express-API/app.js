const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
// Route
const userRouter = require("./routes/web/v1/user.route");
const adminRouter = require("./routes/web/v1/admin.route");
const productRouter = require("./routes/web/v1/product.route");
const chatRouter = require("./routes/web/v1/chat.route");
const cartRouter = require("./routes/web/v1/cart.route");
const orderRouter = require("./routes/web/v1/order.route");
const wishlistRouter = require("./routes/web/v1/wishlist.route");
const productModel = require("./models/product.model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set(db());

// cors origin --> allow only that website that mention into origin group, ex. backend only res when localhost 3002 send reqest, other than give cors error
// localhost 3002 --> req --> accept --> give response
// localhost 3004 --> req --> cors error --> don't give response
// in origin you mention frontend urls (deveopment, producation both)
app.use(cors({ origin: "http://localhost:3002", credentials: true }));

PORT = process.env.PORT;

// temp route --> in Backend we Don't create a Home Route. after Teasting / Developement Remove Home Route
app.get("/", (req, res) => {
  res.status(401).json({ message: "Access Denined !!" });
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/bot", chatRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/wishlist", wishlistRouter)

const seedProducts = async () => {
  try {
    const count = await productModel.estimatedDocumentCount();
    if (count === 0) {
      await productModel.insertMany([
        {
          name: "Smart Fitness Watch",
          description: "Track workouts, sleep, and notifications with a premium AMOLED display.",
          stock: 24,
          price: 129.99,
          discount: 20,
          isNewproduct: true,
          sku: "SKU-WATCH-001",
          images: ["https://picsum.photos/id/1011/900/600"],
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
          images: ["https://picsum.photos/id/1027/900/600"],
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
          images: ["https://picsum.photos/id/1036/900/600"],
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
          images: ["https://picsum.photos/id/1024/900/600"],
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
          images: ["https://picsum.photos/id/1074/900/600"],
          brand: "ZenFlex",
          category: "Fitness",
        },
      ]);
      console.log("✅ Seeded default products into MongoDB");
    }
  } catch (error) {
    console.error("❌ Product seeding failed:", error.message);
  }
};

seedProducts();

app.listen(PORT, () => {
  console.log(`✅ server is Running on PORT ${PORT}`);
});
