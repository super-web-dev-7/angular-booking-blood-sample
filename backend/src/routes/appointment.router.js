import {Router} from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.route('/create').post(appointmentController.create);
router.route('/create_by_patient').post(appointmentController.createByPatient);

router.route('/delete/:id').delete(appointmentController.delete);

router.route('/get').get(appointmentController.get);
router.route('/getAppointmentByNurse/:id').get(appointmentController.getAppointmentByNurse);
router.route('/nurse_status/:id').put(appointmentController.appointmentStatusByNurse);

router.route('/getAppointmentByPatient/:id').get(appointmentController.getAppointmentByPatient);
router.route('/getAppointmentDetail/:id').get(appointmentController.getAppointmentDetail);
router.route('/getAppointmentWithNurseInfo/:appointmentId').get(appointmentController.getAppointmentWithNurseInfo);

router.route('/getAppointmentsByAnamnes').get(appointmentController.getAppointmentsByAnamnes);
router.route('/getAppointmentWithQuestionById/:id').get(appointmentController.getAppointmentWithQuestionById);
router.route('/getAppointmentsByAnamnesArchived').get(appointmentController.getAppointmentsByAnamnesArchived); //

router.route('/getAppointmentsWithActiveCallback').get(appointmentController.getAppointmentsWithActiveCallback);
router.route('/getAppointmentWithCallbackById/:id').get(appointmentController.getAppointmentWithCallbackById);
router.route('/getAppointmentsWithArchivedCallback').get(appointmentController.getAppointmentsWithArchivedCallback); //

router.route('/getAppointmentsWithoutArchived').get(appointmentController.getAppointmentsWithoutArchived);
router.route('/getAppointmentsDetailWithoutArchived/:id').get(appointmentController.getAppointmentsDetailWithoutArchived);

router.route('/getAppointmentsWithArchived').get(appointmentController.getAppointmentsWithArchived);


router.route('/analysisByAgency/:userId').get(appointmentController.analysisByAgency);
router.route('/analysisByPackage/:userId').get(appointmentController.analysisByPackage);
router.route('/analysisPerMonth/:userId').get(appointmentController.analysisPerMonth);
router.route('/analysisTotalPatient/:userId').get(appointmentController.analysisTotalPatient);

export default router;
