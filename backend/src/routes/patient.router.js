import {Router} from 'express';

import * as patientController from '../controllers/patient.controller';

const router = Router();

router.route('/createMedicalQuestion').post(patientController.createMedicalQuestion);

export default router;
