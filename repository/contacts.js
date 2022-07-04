const { Contact } = require('../models');

const listContacts = async ({ limit, skip, select, status }, user) => {
  
  const total = await Contact.countDocuments({ owner: user.id });
  const results = await Contact.find(status)
    .select(select)
    .skip(skip)
    .limit(limit)
  
  return { total, results };
  
};

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user.id }).populate({
    path: 'owner',
    select: 'name email subscription',
  });
  return result;
}

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: user.id });
  return result;
}

const createContact = async (body, user) => {
    const result = await Contact.create({...body, owner: user.id});
    return result;
}

const updateContact = async (contactId, body, user) => {
    const result = await Contact.findOneAndUpdate(
        { _id: contactId, owner: user.id },
        { ...body },
        { new: true },
    )
    return result;
}

const updateStatusContact = async (contactId, favorite, user) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: user.id },
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