// setup env file
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Router
const userRouter = require("./routes/web/user.route");
const adminRouter = require("./routes/web/admin.route");
const productRouter = require("./routes/web/product.route");
const chatRouter = require("./routes/web/chat.route");
const cartRouter = require("./routes/web/cart.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
app.use(cookieParser());

// cors origin --> allow only that website or port that mention into origin grop. backend only response when localhost 3002 send request other than give cors origin error

app.use(cors({ origin: "http://localhost:3002", credentials: true }));

// To excess env values in file:
// Backend (node + express) --> process.env.(env file variable name)
// Frontend (React) --> import.meta.env.(env file variable name)
PORT = process.env.PORT;

// home route (temp route) --> in Backend we don't create a Home Route. after Testing/ Development --> Remove Home Route
app.get("/", (req, res) => {
  res.send("server's Homepage");
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/bot", chatRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is Running on PORT ${PORT}`);
});
