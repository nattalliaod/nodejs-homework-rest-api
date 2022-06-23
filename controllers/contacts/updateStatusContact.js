const { updateStatusContact } = require('../../repository/contacts');
const HTTP_STATUS_CODE = require('../../libs/constants');

const updatingOneFieldContact = async (req, res, next) => {
  try {
    if (req.body.favorite === undefined) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({
          status: 'error',
          code: HTTP_STATUS_CODE.BAD_REQUEST,
          message: "Missing field favorite.",
        });
    }

    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await updateStatusContact(contactId, favorite);
      
  if (!result) {
    return res
      .status(HTTP_STATUS_CODE.NOT_FOUND)
      .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not found' });
  }

  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { result } });
  } catch (error) {
    next(error);
  }
}

module.exports = updatingOneFieldContact;


