const { randomUUID } = require('crypto');
const DB = require('./db');
const db = new DB('./contacts.json');

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  
  if (index !== -1) {
    const contact = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }

  return null;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: randomUUID(),
    ...body
  }
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  
  if (index !== -1) {
    contacts[index] = {...contacts[index], ...body};
    await db.write(contacts);
    return contacts[index];
  }
  
  return null;
}

const updateOneFieldContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  
  if (index === -1) return null;
  if (name) contacts[index].name = name;
  if (email) contacts[index].email = email;
  if (phone) contacts[index].phone = phone;
  await db.write(contacts);
  
  return contacts[index];
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateOneFieldContact
}
