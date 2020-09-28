import {Router} from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.route('/create').post(userController.create);
router.route('/patient/create').post(userController.createPatient);
router.route('/get').get(userController.get);
router.route('/delete/:id').delete(userController.delete);
router.route('/update/:id').put(userController.update);
router.route('/get/patient/:id').get(userController.getPatientById);
router.route('/update/patient/:id').put(userController.updatePatientById);
router.route('/get/working-group').get(userController.getAgAdminInWorkingGroup)

export default router;
