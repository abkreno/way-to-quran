const axios = require('axios');
const chalk = require('chalk');
const logger = require('./logger');
exports.setupBotWebhook = url => {
  axios
    .post(
      `https://api.telegram.org/bot${
        process.env.TELEGRAM_BOT_TOKEN
      }/setWebhook`,
      { url },
    )
    .then(response => {
      // eslint-disable-next-line no-console
      console.log(`${chalk.bold(response.data.description)}`);
    })
    .catch(e => {
      logger.error(e.message);
    });
};
