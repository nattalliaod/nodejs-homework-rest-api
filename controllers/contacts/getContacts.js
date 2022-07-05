// const { listContacts } = require('../../repository/contacts');
const contactsService = require('../../services/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const getContacts = async (req, res) => {
  const { user, query } = req;

  const contacts = await contactsService.getAll( query, user);
  
  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { ...contacts }
  });
 }

module.exports = getContacts;

