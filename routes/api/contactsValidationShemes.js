const Joi = require('joi');

const numberPattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schemaAddContact = Joi.object({
    name: Joi
        .string()
        .pattern(namePattern)
        .min(3)
        .max(30)
        .required()
        .messages({
            'any.optional': 'Field "name" is required',
            'string.empty': 'Field "name" cannot be empty',
        }),


    phone: Joi
        .string()
        .pattern(numberPattern)
        .required()
        .messages({
            'any.optional': 'Field "phone" is required',
            'string.empty': 'Field "phone" cannot be empty',
        }),

    email: Joi
        .string()
        .email()
        .required()
        .messages({
            'any.optional': 'Field "email" is required',
            'string.empty': 'Field "email" cannot be empty',
        }),

});

const schemaUpdateContact = Joi.object({
    name: Joi
        .string()
        .pattern(namePattern)
        .min(3)
        .max(30),

    phone: Joi
        .string()
        .pattern(numberPattern)
        .optional(),

    email: Joi
        .string()
        .email()
        .optional(),
});

module.exports = { schemaAddContact, schemaUpdateContact };