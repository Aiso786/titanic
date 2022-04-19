import * as express from 'express';
import {feedData, getPassengers} from '../controllers/passengers';

const router = express.Router();

router.get('/', getPassengers);
router.post('/', feedData) 

module.exports = router;