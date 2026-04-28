const express = require("express");
const { body } = require("express-validator");
const userController = require("../../controllers/user.controller");
const middleware = require("../../middlewares/user.middleware")


const router = express.Router();

// register user
// second validation -- use express validator package
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username must be 5 charcters long"),
    body("email").isEmail().withMessage("Enter Vaild Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("pasword must be 6 charcters long"),
  ],
  userController.registerUser,
);

// logoin user
// router --> controller
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("pasword must be 6 charcters long"),
  ],
  userController.loginUser,
);

// profile
// router --> middleware --> controller
router.get("/profile", middleware.authUser, userController.profileUser);

// edit profile
// router --> service --> controller
router.put("/update", middleware.authUser, userController.updateProfile);

// logout
// router --> controller
router.get("/logout", middleware.authUser, userController.logoutProfile)

module.exports = router;
