import { NextFunction, Request, Response } from 'express';
import { OrgModel } from '../models/OrgModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import { verifyJWTAsync } from '../utils/handleJwt';

// A protection middleware to check the authorization for an organisation.
const orgProtect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);

    if (!req.headers.authorization)
      throw new CustomError('Authorization header missing', 401);

    const userEnteredJWT = req.headers.authorization.split(' ')[1];
    const decoded = await verifyJWTAsync(userEnteredJWT);
    const currentOrg = await OrgModel.findById(decoded.id);
    if (!currentOrg)
      throw new CustomError('No user found with the given token', 401);

    req.body.currentUser = currentOrg;
    next();
  }
);

export default { orgProtect };
