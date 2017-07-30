import Joi from 'joi';

export const ID = Joi.string().alphanum();
export const NAME = Joi.string().min(3).max(100);
export const USERNAME = Joi.string().alphanum().min(3).max(16);
export const EMAIL = Joi.string().email();
export const PASSWORD = Joi.string().min(8).max(16);
export const DATE = Joi.number().integer().max(new Date().getTime());
export const PROBLEM_TOPIC = Joi.number().integer().min(1).max(8);
export const DESCRIPTION = Joi.string().min(10).max(500);
export const STATUS = Joi.number().integer().min(1);
export const PROFILE = Joi.object().keys({ name: NAME.required().label('Full Name') });
export const CATEGORY = Joi.string();

export const ACCOUNTS_REGISTER_SCHEMA = Joi.object().keys({
  username: USERNAME.required().label('Username'),
  email: EMAIL.required().label('Email'),
  password: PASSWORD.required().label('Password'),
  // re_password: Joi.any().valid(Joi.ref('password')).required().label('Re Password')
  //   .error(() => ({ message: 'Password didn\'t match' })),
  profile: PROFILE
});

export const BOOKS_CREATE_SCHEMA = Joi.object().keys({
  name: NAME.required(),
  category_id: ID.required(),
  authors: Joi.array().required()
});

export const BOOKS_UPDATE_SCHEMA = Joi.object().keys({
  name: NAME,
  category_id: ID,
  authors: Joi.array()
});
