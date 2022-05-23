import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      next(new CustomError(err.message, 400));
    });
  };
};
