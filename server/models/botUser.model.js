/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Bot User Schema
 * @private
 */
const botUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    is_bot: {
      type: Boolean,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
    },
    language_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Methods
 */
botUserSchema.method({});

/**
 * Statics
 */
botUserSchema.statics = {
  async findOneOrCreate(condition) {
    const self = this;
    const result = await self.findOne(condition);
    return result || self.create(condition);
  },
  /**
   * Get bot user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<BotUser, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'Bot User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef Bot User
 */
module.exports = mongoose.model('BotUser', botUserSchema);
