import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required(),
      department: Joi.string().required(),
      avatar: Joi.string(),
      password: Joi.string().required(),
      mobileNumber: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      mobileNumber: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
