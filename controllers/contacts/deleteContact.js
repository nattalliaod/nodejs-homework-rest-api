const contactsService = require('../../services/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  
  const contact = await contactsService.remove(contactId, user);

  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    message: "contact deleted",
    payload: { contact }
  });
}  

module.exports = deleteContact;