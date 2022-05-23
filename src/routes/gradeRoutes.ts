import { Router } from 'express';
import authController from '../controllers/authController';
import gradeController from '../controllers/gradeController';

const router = Router();

router
  .route('/create')
  .post(authController.subOrgProtect, gradeController.createGrade);

export default router;
