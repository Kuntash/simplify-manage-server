import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';

const handleDuplicateError = (error: Error) => {
  return new CustomError('Duplicate value error', 409);
};
const sendError = (res: Response, err: CustomError) => {
  res.status(err.code).json({
    status: 'failed',
    message: err.message,
  });
};
const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // All the error would come here;
  if (error.code === 11000) {
    sendError(res, handleDuplicateError(error));
  }
  console.log(error);
  res.status(error.code).json({
    error: error.message,
  });
};

export default globalErrorHandler;
