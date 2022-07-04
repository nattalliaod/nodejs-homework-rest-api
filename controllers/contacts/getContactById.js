const contactsService = require('../../services/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const { user } = req;

        const contact = await contactsService.getById(contactId, user);
        
        return res.json({
        status: 'success',
        code: HTTP_STATUS_CODE.OK,
        payload: { contact }
        }); 
}

module.exports = getContactById;