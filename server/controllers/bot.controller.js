const axios = require('axios');
const httpStatus = require('http-status');
const { BOT_URL } = require('../config/botSetup');
const BotUser = require('../models/botUser.model');

const sendMessage = (chatId, text) => {
  console.log(`sending message "${text}" to ${chatId}`);
  return axios.post(`${BOT_URL}/sendMessage`, { chat_id: chatId, text });
};

/**
 * Returns
 * @public
 */
exports.botUpdate = async (req, res, next) => {
  try {
    const message = req.body.message || req.body.edited_message;
    const { from } = message;
    const chatId = message.chat.id;
    const user = await BotUser.findOneOrCreate(from);
    await sendMessage(chatId, 'Hello World');
    res.status(httpStatus.CREATED);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return next();
  }
};
