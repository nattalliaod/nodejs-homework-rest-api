const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const numberPattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schemaContactJoi = Joi.object({
    name: Joi.string().pattern(namePattern).min(3).max(30).required().messages({
            'any.optional': 'Field "name" is required',
            'string.empty': 'Field "name" cannot be empty',
        }),

    phone: Joi.string().pattern(numberPattern).required().messages({
            'any.optional': 'Field "phone" is required',
            'string.empty': 'Field "phone" cannot be empty',
        }),

    email: Joi.string().email().required().messages({
            'any.optional': 'Field "email" is required',
            'string.empty': 'Field "email" cannot be empty',
        }),
    
    favorite: Joi.boolean().optional(),
});

const schemaFavoriteContact = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': 'Field favorite is required'
    }),
});

const schemaMongoId = Joi.object({
    contactId: Joi.objectId().required(),
});

module.exports = { schemaContactJoi, schemaFavoriteContact, schemaMongoId };