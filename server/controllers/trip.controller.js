import Trip from '../models/trip.model';


function load(req, res, next, id) {
  Trip.get(id)
    .then((trip) => {
      req.trip = trip; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get trip
 * @returns {Trip}
 */
function get(req, res) {
  return res.json(req.trip);
}
/**
 * Create new trip
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res) {
  const trip = new Trip({
    departure: req.body.departure,
    destination: req.body.destination,
    userId: req.body.userId,
    driverId: req.body.driverId,
    cost: req.body.cost
  });
  trip.save()
      .then(res.json({
        message: 'Success'
      }))
        .catch(err => res.json({
          message: 'Order error',
          error: err
        }));
}


/**
 * Get trip list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Trip.list({ limit, skip })
    .then(trips => res.json(trips))
    .catch(e => next(e));
}

/**
 * Delete trip.
 * @returns {Trip}
 */
function remove(req, res, next) {
  const trip = req.trip;
  trip.remove()
    .then(deletedTrip => res.json(deletedTrip))
    .catch(e => next(e));
}

export default { get, create, list, remove, load };
