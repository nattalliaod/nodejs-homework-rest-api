const { getContactById } = require('../../models/contacts');

const gettingContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
  
    if (!contact) {
      return res
          .status(404)
          .json({ status: 'error', code: 404, message: 'Not found' });
    }

    return res.json({ status: 'success', code: 200, payload: { contact } });

}

module.exports = gettingContactById;