const { CustomError } = require('../../middlewares/errorHandler');
const { User } = require('../../models');
const HTTP_STATUS_CODE = require('../../libs/constants');

const subscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { userId: id } = req.params;

  try {
    const user = await User.findById(id);

      if (!user) {
          throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, `Not found ${user}`);
      }

    user.updateSubscription(subscription);
    await user.save();

      res.status(HTTP_STATUS_CODE.OK).json({
          status: 'success',
          code: HTTP_STATUS_CODE.OK,
          payload: { subscription },
      });
  } catch (error) {
    throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, `Not found user by id:${id}`);
  }
};

module.exports = subscription;