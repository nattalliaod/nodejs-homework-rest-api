const { addContact } = require('../../models/contacts');

const addingContact = async (req, res, next) => {
    const { body } = req;
    const contact = await addContact(body);

    if (!body.phone || !body.name || !body.email) {
      return res
        .status(400)
        .json({ status: 'error', code: 400, message: '"Missing required name field"' });
    }
    
    return res.status(201).json({ status: 'success', code: 201, payload: { contact } });
}

module.exports = addingContact;