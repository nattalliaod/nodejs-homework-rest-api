const { removeContact } = require('../../repository/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
  
    if (!contact) {
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not found' });
    }

    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, message: "contact deleted", payload: { contact } });
  
  } catch (error) {
    next(error);
  }
}  

module.exports = deleteContact;