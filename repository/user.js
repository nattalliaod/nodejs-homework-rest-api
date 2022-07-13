const { User } = require('../models');

const findById = async (id) => {
    return await User.findById(id);
}

const findByEmail = async (email) => {
    return await User.findOne({ email });
}

const findByToken = async (verificationEmailToken) => {
    return await User.findOne({ verificationEmailToken });
}

const create = async (body) => {
    const user = await User(body);
    return await user.save();
}

const updateToken = async (id, token) => {
    return await User.findByIdAndUpdate(id, { token });// updateOne
}

const updateAvatar = async (id, avatarURL, cloudId = null) => {
    return await User.findByIdAndUpdate(id, { avatarURL, cloudId });
}

const verificationUser = async (id) => {
    return await User.findByIdAndUpdate(id, {
        verify: true,
    }); // updateOne
}

module.exports = {
    findById,
    findByEmail,
    findByToken,
    create,
    updateToken,
    updateAvatar,
    verificationUser
}