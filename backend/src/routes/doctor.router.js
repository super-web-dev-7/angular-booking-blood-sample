import {Router} from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.route('/createMedicalAnswer').post(doctorController.createMedicalAnswer);

export default router;
