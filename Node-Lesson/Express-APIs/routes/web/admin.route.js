const express = require("express");
let router = express.Router();
let userMiddleware = require("../../middlewares/user.middleware");
let adminMiddleware = require("../../middlewares/admin.middleware");
let adminController = require("../../controllers/admin.controller");

// get all user
// router --> service --> controller --> call controller into router
router.get(
  "/all",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  adminController.AllUser,
);

// delete single user
router.delete(
  "/user/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  adminController.DeleteUser,
);

// change role - create manager
router.put(
  "/user/:id/role",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  adminController.UpdateUserRole,
);

module.exports = router;
