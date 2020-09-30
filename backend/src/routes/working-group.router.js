import {Router} from 'express';
import * as workingGroupController from '../controllers/working-group.controller';
import permit from "../middlewares/roleMiddleware";

const router = Router();

router.route('/create').post(permit('Superadmin'), workingGroupController.create);
router.route('/get').get(workingGroupController.get);
router.route('/delete/:id').delete(permit('Superadmin'), workingGroupController.delete);
router.route('/update/:id').put(workingGroupController.update);
router.route('/get/unused').get(workingGroupController.getUnusedGroup)

export default router;
