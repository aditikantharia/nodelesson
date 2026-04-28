const chatService = require("../services/chat.service");

module.exports.chatBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(404).json({ message: "can't get message" });
    }

    const reply = await chatService.BotReply(message);

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
