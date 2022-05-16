import { Router } from 'express';
import authController from '../controllers/authController';
import subOrgController from '../controllers/subOrgController';

const router = Router();

// '/' route is equal to /api/v1/suborg

router
  .route('/create-suborg')
  .post(authController.orgProtect, subOrgController.createSubOrg);
export default router;
