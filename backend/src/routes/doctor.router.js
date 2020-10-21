import {Router} from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.route('/sendMessageToPatient').post(doctorController.sendMessageToPatient);
router.route('/getContactHistory/:id').get(doctorController.getContactHistory);
router.route('/cancelAppointment/:id').put(doctorController.cancelAppointment);

export default router;
