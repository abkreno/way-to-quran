const axios = require('axios');
const chalk = require('chalk');
const logger = require('./logger');
const BOT_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

exports.BOT_URL = BOT_URL;

exports.setupBotWebhook = url => {
  axios
    .post(`${BOT_URL}/setWebhook`, { url })
    .then(response => {
      // eslint-disable-next-line no-console
      console.log(`${chalk.bold(response.data.description)}`);
    })
    .catch(e => {
      logger.error(e.message);
    });
};
