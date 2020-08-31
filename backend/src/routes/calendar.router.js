import {Router} from 'express';
import * as calendarController from '../controllers/calendar.controller';

const router = Router();

router.route('/create').post(calendarController.create);
router.route('/get').get(calendarController.get);
router.route('/delete/:id').delete(calendarController.delete);
router.route('/update/:id').put(calendarController.update);

export default router;