import {Router} from 'express';
import testRouter from './test.router';
import authRouter from './auth.router';
import dashboardRouter from './dashboard.router';
import packageRouter from './package.router';
import workingGroupRouter from './working-group.router';
import userRouter from './user.router';
import districtRouter from './district.router';
import calendarRouter from './calendar.router';
import templateRouter from './template.router';
import additionalPackageRouter from './additional-package.router';
import agencyRouter from './agency.router';
import appointmentRouter from './appointment.router';
import patientRouter from './patient.router';
import otherRouter from './other.router';


const router = Router();

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/package', packageRouter);
router.use('/group', workingGroupRouter);
router.use('/user', userRouter);
router.use('/district', districtRouter);
router.use('/calendar', calendarRouter);
router.use('/template', templateRouter);
router.use('/additional-package', additionalPackageRouter);
router.use('/agency', agencyRouter);
router.use('/appointment', appointmentRouter);
router.use('/patient', patientRouter);
router.use('', otherRouter);


export default router;
