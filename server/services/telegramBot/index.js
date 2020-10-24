const TelegramBot = require('node-telegram-bot-api');
const {
  DAILY_VERSE_READ_POLL_TYPE,
  DAILY_VERSE_READ_QUESTION,
  DAILY_VERSE_TIME_POLL_TYPE,
  DAILY_VERSE_TIME_OPTIONS,
  DAILY_VERSE_TIME_QUESTION,
  DAILY_VERSE_READ_OPTIONS,
  // HELP_MESSAGE,
} = require('./constants');
const BotUser = require('../../models/botUser.model');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const sendPoll = async (user, type, question, options) => {
  // send daily verse poll
  const message = await bot.sendPoll(user.id, question, options, {
    is_anonymous: false,
  });
  const poll = {
    name: type,
    id: message.poll.id,
    options,
  };
  try {
    await BotUser.updateOne(
      { id: user.id },
      { $set: { polls: [...user.polls, poll] } },
    );
  } catch (error) {
    console.log(error);
  }
};

const setupBotWebhook = url => {
  bot.setWebHook(url);
  // Matches "/echo [whatever]"
  bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

  bot.onText(/\/dailyverse/, async msg => {
    const user = await BotUser.findOneOrCreate(msg.chat);
    sendPoll(
      user,
      DAILY_VERSE_READ_POLL_TYPE,
      DAILY_VERSE_READ_QUESTION,
      DAILY_VERSE_READ_OPTIONS,
    );
  });

  bot.on('poll_answer', async answer => {
    const user = await BotUser.findOne({ id: answer.user.id });
    const poll = user.polls.find(p => p.id === answer.poll_id);
    const userAnswer = poll.options[answer.option_ids[0]];
    if (poll.name === DAILY_VERSE_READ_POLL_TYPE) {
      if (userAnswer === 'Yes') {
        sendPoll(
          user,
          DAILY_VERSE_TIME_POLL_TYPE,
          DAILY_VERSE_TIME_QUESTION,
          DAILY_VERSE_TIME_OPTIONS,
        );
      }
    } else if (poll.name === DAILY_VERSE_TIME_POLL_TYPE) {
      console.log('Log time', { userAnswer });
    }
  });

  bot.on('polling_error', err => console.log(err));
};

module.exports = {
  bot,
  setupBotWebhook,
};
