import {Router} from 'express';

import * as patientController from '../controllers/patient.controller';

const router = Router();

router.route('/createMedicalQuestion').post(patientController.createMedicalQuestion);
router.route('/createCallbackForDoctor').post(patientController.createCallback);

router.route('/cancel_appointment_by_patient').post(patientController.cancelAppointmentByPatient);
router.route('/shift_appointment_by_patient').post(patientController.shiftAppointmentByPatient);

export default router;
