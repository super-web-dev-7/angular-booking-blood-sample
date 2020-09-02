import {Router} from 'express';
import * as workingGroupController from '../controllers/working-group.controller';

const router = Router();

router.route('/create').post(workingGroupController.create);
router.route('/get').get(workingGroupController.get);
router.route('/delete/:id').delete(workingGroupController.delete);
router.route('/update/:id').put(workingGroupController.update);

export default router;
