const express = require('express');
const router = express.Router();

const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateOneFieldContact
} = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares/validateBody');
const { schemaAddContact, schemaUpdateContact} = require('./contactsValidationShemes');

router
  .get('/', getContacts)
  .post('/', validateBody(schemaAddContact), addContact);

router
  .get('/:contactId', getContactById)
  .delete('/:contactId', removeContact)
  .put('/:contactId', validateBody(schemaUpdateContact), updateContact)
  .patch('/:contactId', validateBody(schemaUpdateContact), updateOneFieldContact);

module.exports = router;
