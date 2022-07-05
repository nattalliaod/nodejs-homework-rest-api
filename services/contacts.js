const {
    listContacts,
    getContactById,
    removeContact,
    createContact,
    updateContact,
    updateStatusContact
} = require('../repository/contacts');
const HTTP_STATUS_CODE = require('../libs/constants');
const { CustomError } = require('../middlewares/errorHandler');

class ContactsService {
    async getAll( query, user) {
        
        const { page = 1, limit = 10, filter, favorite } = query;
        const skip = (page - 1) * limit;
        let select = null;
        let status = null;
        
    if (filter) {
        select = filter.split('|').join(' ');
        };
        
    if (favorite) {
        status = { owner: user.id, favorite };
    } else {
        status = { owner: user.id };
    };

        const { total, results: contacts } = await listContacts(
            { limit, skip, select, status }, user);
        return { total, contacts };
    };

  async getById(id, user) {
      const contact = await getContactById(id, user);
    if (!contact) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found');
    }
      return contact;
  }

  async create(body, user) {
      const contact = await createContact(body, user);
      return contact;
  }

  async update(id, body, user) {
      const contact = await updateContact(id, body, user);
    if (!contact) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found');
    }
      return contact;
  }

  async remove(id, user) {
      const contact = await removeContact(id, user);
    if (!contact) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found');
    }
      return contact;
    }
    
      async updateStatus(id, favorite,  user) {
          const contact = await updateStatusContact(id, favorite, user);
    if (!contact) {;
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found');
    }
          return contact;
  }
};

module.exports = new ContactsService();