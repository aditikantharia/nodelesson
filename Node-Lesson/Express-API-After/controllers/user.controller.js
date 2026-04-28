const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

module.exports.registerUser = async (req, res, next) => {
  const erorr = validationResult(req);

  if (!erorr.isEmpty()) {
    return res.status(400).json({ erorr: erorr.array() });
  }

  const { username, email, password, role } = req.body;

  const exitsingUser = await userModel.findOne({ email: email });
  if (exitsingUser) {
    return res.status(400).json({ message: "User already register." });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
    role,
  });

  const token = await user.generateToken();

  res.status(200).json({ user, token });
};

module.exports.loginUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");


  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }

  let compare = await user.comparePassword(password);

  if (!compare) {
    return res.status(401).json({ message: "Wrong Password" });
  }

  const token = await user.generateToken();
  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.profileUser = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ mesage: "User Logout Sucessfully" });
};

module.exports.updateUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const userId = req.user.id; // middlware --> JWT Token

  const { email, username } = req.body;

  const updateUser = await userService.updateUser({ userId, username, email });

  res.status(200).json({ message: "User Update Sucessfully", updateUser });
};

module.exports.ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const message = await userService.forgetPassword(email);

    res.status(200).json({ message: "Email Send to User Mail", message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.ResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    const message = await userService.ResetPassword({ token, newPassword });

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
