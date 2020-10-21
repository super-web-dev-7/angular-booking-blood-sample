import {Router} from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.route('/sendMessageToPatient').post(doctorController.sendMessageToPatient);
router.route('/getContactHistory/:id').get(doctorController.getContactHistory);
router.route('/cancelAppointment/:id').put(doctorController.cancelAppointment);
router.route('/releaseAppointment/:id').put(doctorController.releaseAppointment);

export default router;
