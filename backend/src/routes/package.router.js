import {Router} from 'express';
import * as packageController from '../controllers/package.controller';

const router = Router();

router.route('/create').post(packageController.create);

export default router;
