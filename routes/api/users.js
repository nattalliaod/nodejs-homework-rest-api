const express = require('express');
const router = express.Router();

const { joiUpdateSubscription } = require('../../models');
const { guard, upload, validateBody } = require('../../middlewares');

const { wrapper: wrapperError } = require('../../middlewares/errorHandler');
const { users: ctrl } = require('../../controllers');

router.get('/current', guard, wrapperError(ctrl.getCurrent));
router.patch('/avatars', guard, upload.single('avatar'), wrapperError(ctrl.avatar));
router.patch('/subscription', guard, validateBody(joiUpdateSubscription), wrapperError(ctrl.updateSubscription));

module.exports = router;