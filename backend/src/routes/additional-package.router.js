import {Router} from 'express';
import * as additionalPackageController from '../controllers/additional-package.controller';

const router = Router();

router.route('/create').post(additionalPackageController.create);
router.route('/get').get(additionalPackageController.get);
router.route('/update/:id').put(additionalPackageController.update);
router.route('/delete/:id').delete(additionalPackageController.delete);

export default router;
