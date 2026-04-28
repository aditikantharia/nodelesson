const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// database side validation
let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager"],
      default: "user",
    },
  },
  { timestamps: true },
);

// jwt logic
userSchema.methods.generateToken = function () {
  let token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// bcrypt logic

// compare
userSchema.methods.comparePassword = async function (password) {
  let compare = await bcrypt.compare(password, this.password);
  return compare;
};

// hash
userSchema.statics.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = mongoose.model("user", userSchema);
