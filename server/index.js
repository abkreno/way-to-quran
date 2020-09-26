/* eslint-disable prefer-destructuring */
/* eslint consistent-return:0 import/order:0 */

const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

const logger = require('./config/logger');

const argv = require('./config/argv');
const setup = require('./middlewares/frontendMiddleware');
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const host = isDev ? 'localhost' : '0.0.0.0';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
const app = require('./config/express');
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, host, url);
  } else {
    logger.appStarted(port, host);
  }
});

/**
 * Exports express
 * @public
 */
module.exports = app;
