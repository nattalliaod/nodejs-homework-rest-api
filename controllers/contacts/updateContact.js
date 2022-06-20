const { updateContact } = require('../../models/contacts');

const updateAllFieldsContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const contact = await updateContact(contactId, body);
  
  if (!body.phone || !body.name || !body.email) {
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: 'Missing fields' });
  }
  
  if (!contact) {
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  }

  return res.json({ status: 'success', code: 200, payload: { contact } });
}

module.exports = updateAllFieldsContact;