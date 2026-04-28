// chatbot --> static(Rule Based Chatbot),Ai Chatbot (gemini Key)
const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chat.controller");
const userMiddleware = require("../../middlewares/user.middleware");

// Rule Based Chatbot
router.post("/chat", chatController.StaticBot);

// Ai Based ChatBot
router.post("/chat/ai", userMiddleware.authUser, chatController.AIBot);

module.exports = router;
