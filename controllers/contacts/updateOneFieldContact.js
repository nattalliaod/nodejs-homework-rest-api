const { updateOneFieldContact } = require('../../models/contacts');

const updatingOneFieldContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const contact = await updateOneFieldContact(contactId, body);
  
  if (!contact) {
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  }

  return res.json({ status: 'success', code: 200, payload: { contact } });
}

module.exports = updatingOneFieldContact;