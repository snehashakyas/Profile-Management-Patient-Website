// Joi: for input validation

const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false }); // when abortEarly is true, validation is stopped on the first error

const signupSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addPatientSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.number().required(),
  dob: Joi.date().required(),
  profilePic: Joi.string().valid("jpeg", "png").required(),
  isStarred: Joi.boolean(),
});

const editPatientSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  contact: Joi.number(),
  dob: Joi.date(),
  profilePic: Joi.string().valid("jpeg", "png"),
  isStarred: Joi.boolean(),
});

exports.validateSignup = validator(signupSchema);
exports.validateSignin = validator(signinSchema);
exports.validateAddPatient = validator(addPatientSchema);
exports.validateEditPatient = validator(editPatientSchema);
