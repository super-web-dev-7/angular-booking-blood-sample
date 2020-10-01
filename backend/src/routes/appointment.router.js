import {Router} from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.route('/create').post(appointmentController.create);
router.route('/get').get(appointmentController.get);
router.route('/update/:id').put(appointmentController.update);
router.route('/delete/:id').delete(appointmentController.delete);

export default router;
