const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { namePattern, phonePattern } = require('../libs/regex');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Owner is required'],
    },
},
    { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactSchema);

const schemaContactJoi = Joi.object({
    name: Joi.string().pattern(namePattern).min(3).max(30).required().messages({
            'any.optional': 'Field "name" is required',
            'string.empty': 'Field "name" cannot be empty',
        }),

    phone: Joi.string().pattern(phonePattern).required().messages({
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

module.exports = { Contact, schemaContactJoi, schemaFavoriteContact, schemaMongoId };


