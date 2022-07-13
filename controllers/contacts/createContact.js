const contactsService = require('../../services/contacts');
const { HTTP_STATUS_CODE } = require('../../libs/constants');

const addContact = async (req, res) => {
  const { body, user } = req;
  
  const contact = await contactsService.create(body, user);
    
    res.status(HTTP_STATUS_CODE.CREATED).json({
      status: 'success',
      code: HTTP_STATUS_CODE.CREATED,
      payload: { contact }
    });
}

module.exports = addContact;