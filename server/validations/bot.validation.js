const Joi = require('joi');

module.exports = {
  // POST /v1/bot/botUpdate
  botUpdate: {
    body: Joi.any(),
  },
};
