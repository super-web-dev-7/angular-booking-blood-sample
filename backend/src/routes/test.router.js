import {Router} from 'express';

import * as testController from '../controllers/test.controller';

const router = Router();

router.route('/ping').get(testController.ping);
router.route('/district/insert').get(testController.insertDistrict);

export default router;
