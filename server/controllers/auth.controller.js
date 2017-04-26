import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../models/user.model'
import APIError from '../helpers/APIError';
import config from '../../config/config';

// sample user, used for authentication
// const user = {
//   mobileNumber: '89193590100',
//   password: '123456789'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res) {
  User.findOne({
    mobileNumber: req.body.mobileNumber,
    password: req.body.password
  }).then((obj) => {
    if (req.body.mobileNumber === obj.mobileNumber && req.body.password === obj.password) {
      const token = jwt.sign({
        _id: obj._id,
        mobileNumber: obj.mobileNumber,
        name: obj.name,
        role: obj.role,
        email: obj.email,
        expire: 3600,
        avatar: obj.avatar,
        department: obj.department
      }, config.jwtSecret);
      return res.json({
        token,
        message: 'Success'
      });
    }
  }).catch(err => res.json({
    message: 'Authentication error',
    error: err
  }));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
