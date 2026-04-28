const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require("./Models/user.model");
const bcrypt = require("bcrypt");
// server memory temporary
// user ni req server pase jai tyare server ne, user kon chhe te khabar hoti nathi, mate darek req sathe user ne authorize karvo pade chhe

// user req --> server (check image into folder)

// cookie parser ==> save token into browser stroage
const cookieParser = require("cookie-parser");
const { get } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("username", "test@user");
  res.send("Server Homepage");
});

// data --> convert jwt --> save cookie
app.get("/jwt", (req, res) => {
  let data = { username: "test", email: "test@gmail.com", role: "admin" };

  let token = jwt.sign(data, "aabbccdd");
  console.log(token);

  res.cookie("token", token);
  res.send("go to application and chek your cookie stroage");
});

// signup
app.get("/signup", async (req, res) => {
  let createdUser = await userModel.create({
    username: "test_user",
    email: "test@user.com",
    password: "test123",
  });
  res.send(createdUser);
});

// for encrypt your password use --> bcrypt package
// use case: when your data leack your password is safe, if you encrypt your all user password
// encrypt password stages:
// your password + salt (default random 10 char) => create a hash
// in database we save hash not password
app.get("/hash", (req, res) => {
  let password = "abc@123";
  //   bcrypt.hash("password", "number", (err, hash)=>{})
  bcrypt.hash(password, 10, (err, hash) => {
    console.log(hash);
    res.send(hash);
  });
});
// login -- password compare (user sys)




app.listen(3000, () => {
  console.log("✅ server is Running");
});
