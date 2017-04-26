import Promise from 'bluebird';
import mongoose from 'mongoose';
import _ from 'lodash';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: false
  },
  carNumber: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.methods.toJSON = function () {
  return _.pick(this, ['_id', 'name', 'avatar', 'department', 'carModel', 'carNumber', 'email', 'mobileNumber']);
};
// UserSchema.method({
//   toJSON: function() {
//     return _.pick(this, ['name', 'department', 'email', 'isAdmin']);
//   },
// });

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(mobileNumber) {
    return this.findOne({ mobileNumber: mobileNumber })
      .exec()
      .then((user) => {
        if (user) {
          return {
            message: 'Success',
            user
          };
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
