const httpStatus = require('http-status');

/**
 * Returns
 * @public
 */
exports.botUpdate = async (req, res, next) => {
  try {
    console.log(req);
    res.status(httpStatus.CREATED);
    return res.json({});
  } catch (error) {
    return next();
  }
};
