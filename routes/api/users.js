const express = require('express');
const router = express.Router();

const { guard } = require('../../middlewares');
const { validateBody, validateParams } = require('../../middlewares');
const { joiUpdateSubscription, joiUserId } = require('../../models');
const { wrapper: wrapperError } = require('../../middlewares/errorHandler');
const { users: ctrl } = require('../../controllers');

router.get('/current', guard, wrapperError(ctrl.getCurrent));
router.patch(
  '/:userId/subscription',
  [
    validateBody(joiUpdateSubscription),
    validateParams(joiUserId),
  ],
  wrapperError(ctrl.updateSubscription),
);

module.exports = router;