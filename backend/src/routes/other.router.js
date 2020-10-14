import {Router} from 'express';

import * as otherController from '../controllers/other.controller';

const router = Router();

router.route('/dashboard/superadmin').get(otherController.getSuperAdminDashboardValues);
router.route('/sendEmail').post(otherController.sendEmail);
router.route('/sendSMS').post(otherController.sendSMS);
router.route('/zipcode/checkPostalCode/:code').get(otherController.checkPostalCode);
router.route('/zipcode/getPostalCodeByName').get(otherController.getPostalCodeByName);

export default router;
