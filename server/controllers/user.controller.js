import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../../config/config';
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}
/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res) {
  User.findOne({
    mobileNumber: req.body.mobileNumber
  }).then((obj) => {
    if (!obj) {
      const token = jwt.sign({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        department: req.body.department,
        avatar: req.body.avatar,
        carModel: req.body.carModel,
        carNumber: req.body.carNumber,
        expire: 3600,
        mobileNumber: req.body.mobileNumber
      }, config.jwtSecret);

      const user = new User({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        department: req.body.department,
        avatar: req.body.avatar,
        carModel: req.body.carModel,
        carNumber: req.body.carNumber,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber
      });
      user.save()
        .then(res.json({
          message: 'Success',
          token
        }))
        .catch(err => res.json({
          message: 'Registration error',
          error: err
        }));
    } else {
      res.json({
        message: 'Registration error',
        error: 'User already registered'
      });
    }
  }).catch(e => res.json({
    message: 'Registration error',
    error: e
  }));
}
/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Get drivers list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listDrivers(req, res, next) {
  // const { limit = 50, skip = 0 } = req.query;
  User.find({ role: 'Водитель' })
    .then(drivers => res.json(drivers))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, listDrivers, remove };
