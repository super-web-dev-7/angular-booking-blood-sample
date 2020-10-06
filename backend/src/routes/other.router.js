import {Router} from 'express';

import * as otherController from '../controllers/other.controller';

const router = Router();

router.route('/dashboard/superadmin').get(otherController.getSuperAdminDashboardValues);
router.route('/sendEmail').post(otherController.sendEmail);

export default router;
