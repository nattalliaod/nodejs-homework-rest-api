const { removeContact } = require('../../models/contacts');

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;  
  const contact = await removeContact(contactId);
  
  if (!contact) {
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  }

  return res.json({ status: 'success', code: 200, message: "contact deleted", payload: { contact } });
}

module.exports = deleteContact;