import mongoose from 'mongoose';

/**
 * Trips Schema
 */
const TripsSchema = new mongoose.Schema({
  departure: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false
  },
  driverId: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
TripsSchema.statics = {
  /**
   * Get trip information
   * @param {ObjectId} id - The objectId of a trip.
   * @returns {Promise<Trip, APIError>}
   */
  get(id) {
    return this.find({ userId: id })
      .sort({ createdAt: -1 })
      .exec();
  },
  /**
   * List of trips in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of trips to be skipped.
   * @param {number} limit - Limit number of trips to be returned.
   * @returns {Promise<Trip[]>}
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
 * @typedef Trips
 */
export default mongoose.model('Trip', TripsSchema);
