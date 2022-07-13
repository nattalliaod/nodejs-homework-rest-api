const contactsService = require('../../services/contacts');
const { HTTP_STATUS_CODE } = require('../../libs/constants');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const { user } = req;
  
  const result = await contactsService.updateStatus(contactId, favorite, user);

  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { result }
  });
}

module.exports = updateStatusContact;


