import {Router} from 'express';
import * as templateController from '../controllers/template.controller';

const router = Router();

router.route('/create').post(templateController.create);
router.route('/get').get(templateController.get);
router.route('/delete/:id').delete(templateController.delete);
router.route('/update/:id').put(templateController.update);
router.route('/getWithQuery').get(templateController.getWithQuery);

export default router;
