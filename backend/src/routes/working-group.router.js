import {Router} from 'express';
import * as workingGroupController from '../controllers/working-group.controller';

const router = Router();

router.route('/create').post(workingGroupController.create);
router.route('/get').get(workingGroupController.get);

export default router;
