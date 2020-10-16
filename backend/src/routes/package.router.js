import {Router} from 'express';
import * as packageController from '../controllers/package.controller';

const router = Router();

router.route('/create').post(packageController.create);
router.route('/get').get(packageController.get);
router.route('/getWithQuery').get(packageController.getWithQuery);
router.route('/update/:id').put(packageController.update);
router.route('/delete/:id').delete(packageController.delete);

export default router;
