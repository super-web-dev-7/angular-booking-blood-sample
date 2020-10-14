import {Router} from 'express';

import * as testController from '../controllers/test.controller';

const router = Router();

router.route('/ping').get(testController.ping);
router.route('/district/insert').get(testController.insertDistrict);
router.route('/zipcode/insert').get(testController.insertZipCode);

export default router;
