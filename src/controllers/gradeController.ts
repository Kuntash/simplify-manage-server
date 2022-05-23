import { NextFunction, Request, Response } from 'express';
import GradeModel from '../models/GradeModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';

const createGrade = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.currentSubOrg, req.body.value);

    // Check if same grade of the currentSubOrg exists
    const sameValueGrade = await GradeModel.findOne({
      value: req.body.value,
      subOrgId: req.body.currentSubOrg._id,
    });
    if (sameValueGrade)
      throw new CustomError('This grade already exists.', 400);
    const newGrade = await GradeModel.create({
      subOrgId: req.body.currentSubOrg._id,
      value: req.body.value,
    });
    res.status(201).json({
      message: 'Grade successfully created',
      gradeData: newGrade,
    });
  }
);

export default { createGrade };
