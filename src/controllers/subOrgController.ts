import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';

const createSubOrg = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.currentUser);
    res.end();
  }
);

export default { createSubOrg };
