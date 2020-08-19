import {Router} from 'express';
import * as userController from '../controllers/auth.controller';

const router = Router();

router.route('/register').post(userController.register);
router.route('/login').post(userController.login)

export default router;
