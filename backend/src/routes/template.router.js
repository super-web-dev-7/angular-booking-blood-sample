import {Router} from 'express';
import * as templateController from '../controllers/template.controller';

const router = Router();

router.route('/create').post(templateController.create);
router.route('/get').get(templateController.get);
router.route('/delete/:id').delete(templateController.delete);
router.route('/update/:id').put(templateController.update);
router.route('/getWithQuery').get(templateController.getWithQuery);
router.route('/getActions').get(templateController.getActions);
router.route('/getAllKeywords').get(templateController.getKeywords);

export default router;
