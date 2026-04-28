const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");

// Router
const userRouter = require("./routes/v1/user.route");
const adminRouter = require("./routes/v1/admin.route");
const productRouter = require("./routes/v1/product.route");
const chatRouter = require("./routes/v1/chat.route");
const cartRouter = require("./routes/v1/cart.route");
const orderRouter = require("./routes/v1/order.route");
const wishlistRouter = require("./routes/v1/wishlist.route");

const cookieParser = require("cookie-parser");

PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3010", credentials: true }));
app.set(db());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(401).json({ message: "Access Denined" });
});
app.use("/user", userRouter); // localhost:3005/user/register
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/bot", chatRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/wishlist", wishlistRouter)

app.listen(PORT, () => {
  console.log(`✅ server is Runing ${PORT}`);
});
