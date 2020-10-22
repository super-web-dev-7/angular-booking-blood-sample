import {Router} from 'express';

import * as patientController from '../controllers/patient.controller';

const router = Router();

router.route('/createMedicalQuestion').post(patientController.createMedicalQuestion);
router.route('/createCallbackForDoctor').post(patientController.createCallback);

export default router;
