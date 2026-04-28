const chatService = require("../services/chat.service");

module.exports.StaticBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(404).json({ message: "Can't Get Message" });
    }

    const reply = await chatService.BotReplay(message);

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.AIBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(404).json({ mesage: "Can't Get Message" });
    }

    const reply = await chatService.AIBotReplay(message);

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
