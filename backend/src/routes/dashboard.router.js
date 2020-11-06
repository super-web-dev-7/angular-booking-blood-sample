import {Router} from 'express';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

// router.route('/get_all').get([permit('patient')], dashboardController.getAll);
router.route('/get_all').get(dashboardController.getAll);

export default router;
