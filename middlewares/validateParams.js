const HTTP_STATUS_CODE = require('../libs/constants');

const validateParams = (schema) => async (req, res, next) => {
  try {
      await schema.validateAsync(req.params);
      next();
  } catch (err) {
      console.log(err.details);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({ status: 'error', code: HTTP_STATUS_CODE.BAD_REQUEST, message: err.message })
  }
}

module.exports = validateParams;