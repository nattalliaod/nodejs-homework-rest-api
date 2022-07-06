const jwt = require('jsonwebtoken');
const { findById } = require('../repository/user');
const { HTTP_STATUS_CODE } = require('../libs/constants');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const guard = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1];
    const isValid = verifyToken(token);

    if (!isValid) {
      console.log(isValid);
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
          status: 'error',
          code: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: 'Not authorized',
      });
  }

    const payload = jwt.decode(token);
    const user = await findById({ _id: payload.id });

  if (!user || user.token !== token) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
          status: 'error',
          code: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: 'Not authorized',
      });
  }
    req.user = user; // res.locals.user = res.user
    next();
}

const verifyToken = (token) => {
  try {
      const t = jwt.verify(token, SECRET_KEY);
      return !!t;
  } catch (error) {
      return false;
  }
}
module.exports = guard;