import {Router} from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.route('/getContactHistory/:id').get(doctorController.getContactHistory);

// second table
router.route('/sendMessageToPatient').post(doctorController.sendMessageToPatient);
router.route('/cancelAppointment/:id').put(doctorController.cancelAppointment);
router.route('/releaseAppointment/:id').put(doctorController.releaseAppointment);

// first table
router.route('/sendMessageToPatientAboutCallback').post(doctorController.sendMessageToPatientAboutCallback);
router.route('/inquiryAnswered/:id').put(doctorController.inquiryAnswered);

export default router;
