import { Router } from 'express';
import authController from '../controllers/authController';
import subjectController from '../controllers/subjectController';

const router = Router();

router
  .route('/create')
  .post(authController.subOrgProtect, subjectController.createSubject);

router
  .route('/')
  .get(authController.subOrgProtect, subjectController.getAllSubjects);

router
  .route('/:subjectId')
  .get(authController.subOrgProtect, subjectController.getSubjectById);
export default router;
