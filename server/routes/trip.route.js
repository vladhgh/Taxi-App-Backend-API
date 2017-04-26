import express from 'express';
import tripCtrl from '../controllers/trip.controller';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/trips - Get list of trips */
router.route('/').get(tripCtrl.list);
/** POST /api/trips/add - Create new trip */
router.route('/add').post(tripCtrl.create);
/** GET /api/trips/:userId - Get user trips list */
router.route('/:userId').get(tripCtrl.get);

router.param('userId', tripCtrl.load);

export default router;
