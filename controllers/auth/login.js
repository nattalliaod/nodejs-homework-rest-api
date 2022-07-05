const authService = require('../../services/auth');
const HTTP_STATUS_CODE = require('../../libs/constants');

const login = async (req, res) => {
  const payload = await authService.login(req.body)
    return res.status(HTTP_STATUS_CODE.OK).json({
        status: 'success',
        code: HTTP_STATUS_CODE.OK,
        payload,
    });
}

module.exports = login;
