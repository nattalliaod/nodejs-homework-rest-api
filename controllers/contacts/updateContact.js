const { updateContact } = require('../../repository/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const updateAllFieldsContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const contact = await updateContact(contactId, body);
  
    if (!body.phone || !body.name || !body.email) {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ status: 'error', code: HTTP_STATUS_CODE.BAD_REQUEST, message: 'Missing fields' });
    }
  
    if (!contact) {
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not found' });
    }

    return res.json({
      status: 'success',
      code: HTTP_STATUS_CODE.OK,
      payload: { contact }
    });
  
  } catch (error) {
    next(error);
  }
  
}

module.exports = updateAllFieldsContact;