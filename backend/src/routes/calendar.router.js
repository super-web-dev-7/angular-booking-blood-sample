import {Router} from 'express';
import * as calendarController from '../controllers/calendar.controller';

const router = Router();

router.route('/create').post(calendarController.create);

router.route('/get').get(calendarController.get);
router.route('/getById/:id').get(calendarController.getById);
router.route('/get_unused').get(calendarController.getUnusedCalendars);
router.route('/get_by_nurse/:nurseId').get(calendarController.getByNurse);

router.route('/delete/:id').delete(calendarController.delete);
router.route('/update/:id').put(calendarController.update);


export default router;