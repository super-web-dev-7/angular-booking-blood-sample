import {Router} from 'express';
import * as templateController from '../controllers/template.controller';

const router = Router();

router.route('/create').post(templateController.create);
router.route('/get').get(templateController.get);
router.route('/delete/:id').delete(templateController.delete);
router.route('/update/:id').put(templateController.update);

export default router;
