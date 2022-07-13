const contactsService = require('../../services/contacts');
const { HTTP_STATUS_CODE } = require('../../libs/constants');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, user } = req;
  
  const contact = await contactsService.update(contactId, body, user);

  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { contact }
  });
}

module.exports = updateContact;