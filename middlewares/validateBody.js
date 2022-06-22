const HTTP_STATUS_CODE = require('../libs/constants');

const validateBody = (schema) => async (req, res, next) => {
  
    try {
        await schema.validateAsync(req.body);
        next();
  } catch (err) {
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({ status: 'error', code: HTTP_STATUS_CODE.BAD_REQUEST, message: err.message });
  }
}

module.exports =  validateBody;