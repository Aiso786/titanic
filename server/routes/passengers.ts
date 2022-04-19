import * as express from 'express';
import {feedData, getPassengers, ping} from '../controllers/passengers';

const router = express.Router();

router.get('/', getPassengers);
router.post('/', feedData);
router.get('/ping', ping);

module.exports = router;