const express = require('express');
const router = express.Router();

const {
    validateBody,
    guard,
} = require('../../middlewares');
const { joiSignupSchema, joiLoginSchema } = require('../../models');
const { wrapper: wrapperError } = require('../../middlewares/errorHandler');
const { auth: ctrl } = require('../../controllers');
const { rateLimit } = require('../../middlewares');

router.post('/signup', rateLimit(15 * 60 * 100, 2), validateBody(joiSignupSchema), wrapperError(ctrl.signup));
router.post('/login', validateBody(joiLoginSchema), wrapperError(ctrl.login));

router.get('/verify-email/:token', wrapperError(ctrl.verifyUser));
router.post('/verify-email', wrapperError(ctrl.reverifyEmail));

router.post('/logout', guard, wrapperError(ctrl.logout));

module.exports = router;