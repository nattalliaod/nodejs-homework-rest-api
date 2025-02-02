const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { randomUUID } = require('crypto');
const { emailPattern } = require('../libs/regex');

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Guest',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      return emailPattern.test(String(value).toLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true);
    }
  },
  cloudId: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationEmailToken: {
    type: String,
    default: randomUUID(),
  },
},
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password =  bcrypt.hashSync(this.password, bcrypt.genSaltSync(6))
  }
    next();
})

userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.updateSubscription = function (newSubscription) {
  this.subscription = newSubscription;
};

const joiSignupSchema = Joi.object({
    name: Joi.string(),
    password: Joi.string().min(6).max(20).required().messages({
        'any.required': 'Password is required',
        'string.empty': 'The password cannot be empty',
    }),
    email: Joi.string().pattern(emailPattern).required().messages({
        'any.required': 'Email is required',
        'string.empty': 'The email cannot be empty',
    }),
    subscription: Joi.string().optional().valid("starter", "pro", "business").default('starter').messages({
      'any.only': `Subscription is one of: ${Object.values(
        "starter", "pro", "business",
      )}`,
    }),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    'any.required': 'Email is required',
    'string.empty': 'The email cannot be empty',
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'The password cannot be empty',
    }),
});

const joiUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(['starter', 'pro', 'business']))
    .required()
    .messages({
      'any.required': 'Subscription is required',
      'any.only': `Subscription is one of: 'starter', 'pro', 'business'`,
    }),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiUpdateSubscription
};