const { listContacts } = require('../../repository/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contacts } });
  
  } catch (error) {
    next(error);
  }
}

module.exports = getContacts;

