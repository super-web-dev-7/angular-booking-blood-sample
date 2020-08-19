import {Router} from 'express';
import testRouter from './test.router';
import authRouter from './auth.router';
import dashboardRouter from './dashboard.router';
import packageRouter from './package.router';

const router = Router();

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/package', packageRouter);

export default router;
