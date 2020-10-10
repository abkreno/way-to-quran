const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/bot.controller');
const { botUpdate } = require('../../validations/bot.validation');

const router = express.Router();

/**
 * @api {post} v1/bot/botUpdate
 * @apiDescription Recieves bot update from webhook
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Bot
 * @apiPermission public
 *
 * @apiSuccess (Recieved 201) {String}  update.id     Access Token's type
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/botUpdate').post(validate(botUpdate), controller.botUpdate);

module.exports = router;
