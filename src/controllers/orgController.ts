import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { OrgModel } from '../models/OrgModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import { comparePassword, hashPassword } from '../utils/handleHashing';
import { createJWT } from '../utils/handleJwt';

const orgLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentOrg = await OrgModel.findOne({ orgEmail: req.body.orgEmail });
    if (!currentOrg)
      throw new CustomError('No organisation with that email is found', 404);

    if (
      !comparePassword(req.body.orgPassword, currentOrg.orgPassword as string)
    ) {
      throw new CustomError('Wrong password. Try again', 403);
    }

    /* NOTE: Create jwt token if the password matches*/
    const jwt = createJWT(currentOrg._id);
    res.status(200).json({
      status: 'success',
      jwt,
      org: currentOrg.toObject(),
    });
  }
);

const orgSignUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Hash the password
    const hashedPassword = await hashPassword(req.body.orgPassword);

    let newOrg = await OrgModel.create({
      orgEmail: req.body.orgEmail,
      orgLocation: {
        country: req.body.orgLocation.country,
        address: req.body.orgLocation.address,
      },
      orgName: req.body.orgName,
      orgPassword: hashedPassword,
    });
    let newOrgObject = newOrg.toObject();
    delete newOrgObject.orgPassword;
    const jwtToken = createJWT(newOrg._id);
    res.status(200).json({
      message: 'Successfully created new Organisation',
      org: newOrgObject,
      jwt: jwtToken,
    });
  }
);

export default { orgSignUp, orgLogin };
