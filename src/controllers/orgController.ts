import util from 'util';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { OrgModel } from '../models/OrgModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import { comparePassword, hashPassword } from '../utils/handleHashing';
import { createJWT } from '../utils/handleJwt';
import formidable from 'formidable';
import { gc } from '../storage';
import { CustomFilesType } from '../types';
import { IncomingMessage } from 'http';
import { formParseAsync, gcpUploadFile } from '../utils';
import { UploadResponse } from '@google-cloud/storage';

// NOTE: Controller for organisation login
const orgLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentOrg = await OrgModel.findOne({
      orgEmail: req.body.orgEmail,
    }).select('+orgPassword');
    if (!currentOrg)
      throw new CustomError('No organisation with that email is found', 404);

    // Comparing the entered password with the hash in the database.
    const passwordCompareValue = await comparePassword(
      req.body.orgPassword,
      currentOrg.orgPassword as string
    );

    if (!passwordCompareValue) {
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

const orgUploadLogo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentOrg } = req.body;
    const bucketName = 'simplifymanage_bucket';
    const simplifyManageBucket = gc.bucket(bucketName);
    const [fields, files] = await formParseAsync(req);
    let { orgLogo }: { orgLogo?: formidable.File } = files;

    console.log(files);
    // Upload
    const logoUrl = await gcpUploadFile(
      'simplifymanage_bucket',
      orgLogo?.filepath as string,
      `organisation/${currentOrg._id}/orgLogo/${Date.now()}-${
        orgLogo?.originalFilename
      }`
    );
    // Set the url
    const updatedOrg = await OrgModel.findByIdAndUpdate(currentOrg._id, {
      orgLogoUrl: logoUrl,
    });
    console.log(updatedOrg);
    res.status(200).json({
      status: 'success',
      message: 'Logo successfully uploaded',
      logoUrl: logoUrl,
    });
  }
);
// NOTE: Controller for organisation sign up.
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // TODO: After org creation, first store the orgLogo in it's directory using
    // newSubOrg's id and then get the upload response link, which we will store inside our mongoose database.
    // await newOrg.updateOne({$set: {orgLogoUrl: uploadResponse.}});

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

export default { orgSignUp, orgLogin, orgUploadLogo };
