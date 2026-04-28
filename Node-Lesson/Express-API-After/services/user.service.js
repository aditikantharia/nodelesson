const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// database change --> user service
// create user
module.exports.createUser = async ({ username, email, password, role }) => {
  if (!username || !email || !password) {
    console.log("All Filed Are Required !!");
  }

  let user = userModel.create({ username, email, password, role });

  return user;
};

// update user
module.exports.updateUser = async ({ userId, username, email }) => {

  const updateUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { username, email },
    { new: true },
  );

  if (!updateUser) {
    throw new Error("User Data Not Found");
  }

  return updateUser;
};

// forget password
// nodemialer logic
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_PASS,
  },
});

module.exports.forgetPassword = async (email) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User Not Found !!");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `http://localhost:3010/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007bff;">Reset Your Password</h2>
        <p>Hi there,</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Reset My Password
            </a>
        </div>
        
        <p>This link will expire in 30 minutes for security reasons.</p>
        <p>Best regards,<br>The Support Team</p>
    </div>`,
  });
  return "Email Send Successfully !!";
};

// reset password
module.exports.ResetPassword = async ({token, newPassword}) => {
  const user = await userModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("User Not Found !!");
  }

  const hashPassword = await userModel.hashPassword(newPassword);

  user.password = hashPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return "User Password reset Sucessfully"
};
