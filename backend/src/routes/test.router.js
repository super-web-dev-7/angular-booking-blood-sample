import {Router} from 'express';

import * as testController from '../controllers/test.controller';

const router = Router();

router.route('/ping').get(testController.ping);

export default router;
