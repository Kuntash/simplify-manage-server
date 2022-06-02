import { Response, Request, NextFunction, Router } from 'express';
import authController from '../controllers/authController';
import orgController from '../controllers/orgController';
const router = Router();

// NOTE: '/' equals /api/v1/org

router.route('/signup').post(orgController.orgSignUp);
router.route('/login').post(orgController.orgLogin);
router
  .route('/uploads/logo')
  .post(authController.orgProtect, orgController.orgUploadLogo);
export default router;
