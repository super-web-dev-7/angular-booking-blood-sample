import {Router} from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/resetToken').post(authController.resetToken);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/verify_code').post(authController.verifyCode);

export default router;
