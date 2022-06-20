const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateOneFieldContact = require('./updateOneFieldContact');
const removeContact = require('./deleteContact');

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateOneFieldContact,
  removeContact,
};