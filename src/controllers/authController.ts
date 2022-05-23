import { NextFunction, Request, Response } from 'express';
import { OrgModel } from '../models/OrgModel';
import SubOrgModel from '../models/SubOrgModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import { verifyJWTAsync } from '../utils/handleJwt';

// A protection middleware to check the authorization for an organisation.
const orgProtect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      throw new CustomError('Authorization header missing', 401);

    const userEnteredJWT = req.headers.authorization.split(' ')[1];
    const decoded = await verifyJWTAsync(userEnteredJWT);
    const currentOrg = await OrgModel.findById(decoded.id);
    if (!currentOrg)
      throw new CustomError('No organisation found with the given token', 401);

    req.body.currentOrg = currentOrg;
    next();
  }
);

const subOrgProtect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      throw new CustomError('Authorization header missing', 401);

    const userEnteredJWT = req.headers.authorization.split(' ')[1];
    const decoded = await verifyJWTAsync(userEnteredJWT);
    const currentSubOrg = await SubOrgModel.findById(decoded.id);
    if (!currentSubOrg)
      throw new CustomError('No organisation found with the given token', 401);
    console.log(currentSubOrg);
    req.body.currentSubOrg = currentSubOrg;
    next();
  }
);

export default { orgProtect, subOrgProtect };
