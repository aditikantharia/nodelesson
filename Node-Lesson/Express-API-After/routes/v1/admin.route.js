const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/admin.middleware");
const AdminController = require("../../controllers/admin.controller");

// show all user
router.get(
  "/all-user",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  AdminController.Alluser,
);

// delete single user
router.delete(
  "/user/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  AdminController.deleteUser,
);

// update role --> create manager
// router --> service --> controller
router.put(
  "/user/:id/role",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  AdminController.updateRole
);

module.exports = router;
