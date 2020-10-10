const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const botRoutes = require('./bot.route');

const router = express.Router();

/**
 * GET api/v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET api/v1/docs
 */
router.use('/docs', express.static('server/docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/bot', botRoutes);

module.exports = router;
