const { createContact } = require('../../repository/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants')

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await createContact(body);

    if (!body.phone || !body.name || !body.email) {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ status: 'error', code: HTTP_STATUS_CODE.BAD_REQUEST, message: '"Missing required name field"' });
    }
    
    return res.status(HTTP_STATUS_CODE.CREATED).json({ status: 'success', code: HTTP_STATUS_CODE.CREATED, payload: { contact } });
  
  } catch (error) {
    next(error);
  }
}

module.exports = addContact;