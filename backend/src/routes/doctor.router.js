import {Router} from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.route('/createMedicalAnswer').post(doctorController.createMedicalAnswer);
router.route('/getContactHistory/:id').get(doctorController.getContactHistory);

export default router;
