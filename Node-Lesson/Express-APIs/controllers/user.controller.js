const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

module.exports.registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { username, email, password, role } = req.body;

  // check user is already register or available database
  let isExist = await userModel.findOne({ email: email });

  if (isExist) {
    return res.status(400).json({ message: "user is already register" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
    role
  });

  let token = await user.generateAuthToken();

  res.status(200).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  let checkUser = await userModel.findOne({ email: email }).select("+password");

  if (!checkUser) {
    return res.status(401).json({ message: "Email is Invalid" });
  }

  const isMatch = await checkUser.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = checkUser.generateAuthToken();
  res.cookie("token", token);

  res.status(200).json({ token, checkUser });
};

module.exports.profileUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// update user
module.exports.updateProfile = async (req, res) => {
  const userId = req.user.id;

  const { username, email } = req.body;

  const user = await userService.updateUser({ userId, username, email });

  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }

  return res.status(200).json({ message: "User updated Successfully", user });
};

// logoutz
module.exports.logoutProfile = async (req, res) => {
  res.clearCookie();
  return res.status(200).json({ message: "user logout sucessfully" });
};
