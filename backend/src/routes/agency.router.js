import {Router} from 'express';
import * as agencyController from '../controllers/agency.controller';

const router = Router();

router.route('/create').post(agencyController.create);
router.route('/get').get(agencyController.get);
router.route('/update/:id').put(agencyController.update);
router.route('/delete/:id').delete(agencyController.delete);

export default router;
