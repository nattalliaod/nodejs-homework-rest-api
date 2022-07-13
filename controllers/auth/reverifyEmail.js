const authService = require('../../services/auth');
const { HTTP_STATUS_CODE } = require('../../libs/constants');

const reverifyEmail = async (req, res) => {
    const { email } = req.body;
    await authService.reverifyEmail(email);
    return res.status(HTTP_STATUS_CODE.OK).json({
        status: 'success',
        code: HTTP_STATUS_CODE.OK,
        data: { message: `Success` },
    });
}

module.exports = reverifyEmail;