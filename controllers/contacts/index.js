const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const createContact = require('./createContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');
const removeContact = require('./deleteContact');

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
};