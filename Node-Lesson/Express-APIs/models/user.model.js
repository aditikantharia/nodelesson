const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// add first validation --> database validation
let userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 5,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // find query -- select false --> response ma add na thay
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"], // acept only two values
    default: "user",
  },
});

// create a method for jwt token
userSchema.methods.generateAuthToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// create a method for bcrypt
userSchema.statics.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

userSchema.methods.comparePassword = async function (password) {
  let result = await bcrypt.compare(password, this.password);
  return result;
}; // this.password --> database saved user's password

module.exports = mongoose.model("user", userSchema);
// user --> database collection name
// userSchame --> user's defualt structure (user document look || user data look)
