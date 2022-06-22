const express = require('express');
const router = express.Router();

const {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact
} = require('../../controllers/contacts');

const { validateBody, validateParams, controllerWrapper} = require('../../middlewares');
const { schemaContactJoi, schemaFavoriteContact, schemaMongoId} = require('../../schemas/contact');

router
  .get('/', controllerWrapper(getContacts))
  .post('/', validateBody(schemaContactJoi), controllerWrapper(createContact));

router
  .get('/:contactId', validateParams(schemaMongoId), controllerWrapper(getContactById))
  .delete('/:contactId', validateParams(schemaMongoId) , controllerWrapper(removeContact))
  .put('/:contactId', [validateBody(schemaContactJoi), validateParams(schemaMongoId)], controllerWrapper(updateContact))
  .patch('/:contactId/favorite', [validateBody(schemaFavoriteContact), validateParams(schemaMongoId)], controllerWrapper(updateStatusContact));

module.exports = router;
