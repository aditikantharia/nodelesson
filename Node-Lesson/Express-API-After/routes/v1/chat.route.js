const express = require("express");
const router = express.Router();
const userMiddleware = require("../../middleware/auth.middleware");
const chatController = require("../../controllers/chat.controller");

// router --> service(logic) --> controller
router.post("/chat", userMiddleware.authUser, chatController.chatBot);

module.exports = router;
