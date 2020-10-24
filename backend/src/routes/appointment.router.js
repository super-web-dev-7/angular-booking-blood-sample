import {Router} from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.route('/create').post(appointmentController.create);
router.route('/get').get(appointmentController.get);
router.route('/update/:id').put(appointmentController.update);
router.route('/delete/:id').delete(appointmentController.delete);
router.route('/getAppointmentByNurse/:id').get(appointmentController.getAppointmentByNurse);
router.route('/ready/:id').put(appointmentController.appointmentReady);

router.route('/getAppointmentByPatient/:id').get(appointmentController.getAppointmentByPatient);
router.route('/getAppointmentDetail/:id').get(appointmentController.getAppointmentDetail);
router.route('/getAppointmentsByAnamnes').get(appointmentController.getAppointmentsByAnamnes);
router.route('/getAppointmentWithQuestionById/:id').get(appointmentController.getAppointmentWithQuestionById);
router.route('/getAppointmentsByAnamnesArchived').get(appointmentController.getAppointmentsByAnamnesArchived); //
router.route('/getAppointmentsWithActiveCallback').get(appointmentController.getAppointmentsWithActiveCallback);
router.route('/getAppointmentWithCallbackById/:id').get(appointmentController.getAppointmentWithCallbackById);
router.route('/getAppointmentsWithArchivedCallback').get(appointmentController.getAppointmentsWithArchivedCallback); //
router.route('/getAppointmentsWithoutArchived').get(appointmentController.getAppointmentsWithoutArchived);
router.route('/getAppointmentsWithArchived').get(appointmentController.getAppointmentsWithArchived);

router.route('/analysisByAgency').get(appointmentController.analysisByAgency);
router.route('/analysisByPackage').get(appointmentController.analysisByPackage);

export default router;
