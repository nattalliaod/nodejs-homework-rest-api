const Contact = require('../models/contact');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async contactId => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
}

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
}

const createContact = async body => {
    const result = await Contact.create({...body});
    return result;
}

const updateContact = async (contactId, body) => {
    const result = await Contact.findOneAndUpdate(
        { _id: contactId },
        { ...body },
        { new: true },
    )
    return result;
}

const updateStatusContact = async (contactId, favorite) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true },
  )
  return result;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact
}