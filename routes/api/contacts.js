const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');

const { validateBody, validateParams, guard, controllerWrapper} = require('../../middlewares');
const { wrapper: wrapperError } = require('../../middlewares/errorHandler');
const { schemaContactJoi, schemaFavoriteContact, schemaMongoId } = require('../../models');

router
  .get('/', guard, controllerWrapper(ctrl.getContacts))
  .post('/', guard, validateBody(schemaContactJoi), wrapperError(ctrl.createContact));

router
  .get('/:contactId', guard, validateParams(schemaMongoId), wrapperError(ctrl.getContactById))
  .delete('/:contactId', guard, validateParams(schemaMongoId) , wrapperError(ctrl.removeContact))
  .put('/:contactId', guard, [validateBody(schemaContactJoi), validateParams(schemaMongoId)], wrapperError(ctrl.updateContact))
  .patch('/:contactId/favorite', guard, [validateBody(schemaFavoriteContact), validateParams(schemaMongoId)], wrapperError(ctrl.updateStatusContact));

module.exports = router;
