import { Router } from 'express';
import authController from '../controllers/authController';
import sectionController from '../controllers/sectionController';

const router = Router();

// '/' -> /api/v1/section/
router
  .route('/create')
  .post(authController.subOrgProtect, sectionController.createSection);

export default router;
