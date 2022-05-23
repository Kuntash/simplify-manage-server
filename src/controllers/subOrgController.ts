import { NextFunction, Request, Response } from 'express';
import SubOrgModel from '../models/SubOrgModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import { comparePassword, hashPassword } from '../utils/handleHashing';
import { createJWT } from '../utils/handleJwt';

const createSubOrg = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.currentOrg)
      throw new CustomError(
        "The user doesn't have the necessary authorization",
        401
      );
    const hashedPassword = await hashPassword(req.body.adminPassword);
    const newSubOrg = await SubOrgModel.create({
      adminEmail: req.body.adminEmail,
      adminName: req.body.adminName,
      adminPassword: hashedPassword,
      affiliationNumber: req.body.affiliationNumber,
      schoolCode: req.body.schoolCode,
      orgId: req.body.currentOrg._id,
      adminProfileUrl: req.body.adminProfileUrl,
      subOrgDetails: req.body.subOrgDetails,
      subOrgName: req.body.subOrgName,
      subOrgType: req.body.subOrgType,
    });

    res.status(200).json({
      status: 'success',
      message: 'New sub-organization successfully created',
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentSubOrg = await SubOrgModel.findOne({
      adminEmail: req.body.adminEmail,
    }).select('+adminPassword');

    if (!currentSubOrg)
      throw new CustomError('No sub organization with that email found', 400);

    if (
      !comparePassword(
        req.body.adminPassword,
        currentSubOrg.adminPassword as string
      )
    ) {
      throw new CustomError('Wrong password. Try again', 403);
    }

    let currentSubOrgObject = currentSubOrg.toObject();
    delete currentSubOrgObject.adminPassword;
    const jwt = createJWT(currentSubOrg._id);
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
      jwt,
      subOrgData: currentSubOrgObject,
    });
  }
);

export default { createSubOrg, login };
