import {Router} from 'express';

import * as otherController from '../controllers/other.controller';

const router = Router();

router.route('/dashboard/superadmin').get(otherController.getSuperAdminDashboardValues);

export default router;
