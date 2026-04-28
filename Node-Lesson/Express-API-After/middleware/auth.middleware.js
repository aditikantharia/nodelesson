const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denined !!" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    let user = await userModel.findOne({ _id: decode._id });

    req.user = user;
   return  next();
  } catch (error) {
    return res.status(500).json({ error: error.array() });
  }
};
