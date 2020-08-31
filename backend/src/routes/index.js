import {Router} from 'express';
import testRouter from './test.router';
import authRouter from './auth.router';
import dashboardRouter from './dashboard.router';
import packageRouter from './package.router';
import workingGroupRouter from './working-group.router';
import userRouter from './user.router';
import districtRouter from './district.router';
import calendarRouter from './calendar.router';

const router = Router();

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/package', packageRouter);
router.use('/group', workingGroupRouter);
router.use('/user', userRouter);
router.use('/district', districtRouter);
router.use('/calendar', calendarRouter);


export default router;
