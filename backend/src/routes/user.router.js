import {Router} from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.route('/create').post(userController.create);
router.route('/get').get(userController.get);
router.route('/delete/:id').delete(userController.delete);
router.route('/update/:id').put(userController.update);

export default router;
