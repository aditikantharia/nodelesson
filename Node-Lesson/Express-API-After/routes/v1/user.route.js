const express = require("express");
const { body } = require("express-validator");
const userController = require("../../controllers/user.controller");
const middleware = require("../../middleware/auth.middleware");

const router = express.Router();

// app.post("/signup", (req, res)=>{
// res.send("user signup")
//})

// backend data validation
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be 3 charcters long"),
    body("email").isEmail().withMessage("Enter Vaild Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must be 6 Charcters Long"),
  ],
  userController.registerUser,
);

// login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter Vaild Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must be 6 Charcters Long"),
  ],
  userController.loginUser,
);

// user profile
router.get("/profile", middleware.authUser, userController.profileUser);

// user logout
router.get("/logout", middleware.authUser, userController.logoutUser);


// update user
router.put(
  "/update",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username must be 3 charcters long"),
    body("email").isEmail().withMessage("Invalid Email !!"),
  ],
  middleware.authUser,
  userController.updateUser,
);

// forget password
// create router --> write logics into service --> handle req and res into controller --> call controller into router
router.post("/forget-password", userController.ForgetPassword)

// reset password
router.post("/reset-passsword/:token", userController.ResetPassword)

module.exports = router;
