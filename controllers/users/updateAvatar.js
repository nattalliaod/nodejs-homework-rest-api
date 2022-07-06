const { HTTP_STATUS_CODE } = require('../../libs/constants');
const AvatarService = require('../../services/avatar');
// const LocalStorage = require('../../services/avatar/localStorage');
const CloudStorage = require('../../services/avatar/cloudStorage');

const avatar = async (req, res, next) => {
  // const avatarService = new AvatarService(LocalStorage, req.file, req.user)
    const avatarService = new AvatarService(CloudStorage, req.file, req.user);
    const urlOfAvatar = await avatarService.update();
    res.json({
        status: 'success',
        code: HTTP_STATUS_CODE.OK,
        payload: { avatarURL: urlOfAvatar },
    });
}

module.exports = avatar;