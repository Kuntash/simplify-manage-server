import { NextFunction, Request, Response } from 'express';
import GradeModel from '../models/GradeModel';
import SectionModel from '../models/SectionModel';
import { catchAsync } from '../utils/catchAsync';
import CustomError from '../utils/CustomError';

const createSection = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if the grade exists
    const currentGrade = await GradeModel.findById({ _id: req.body.gradeId });
    if (!currentGrade) throw new CustomError("The grade doesn't exist", 404);

    // Check if same section exists
    const sameNameSection = await SectionModel.findOne({
      sectionName: req.body.sectionName,
      gradeId: req.body.gradeId,
    });
    if (sameNameSection)
      throw new CustomError('Section with the same name already exists', 400);

    const currentSection = await SectionModel.create({
      sectionName: req.body.sectionName,
      gradeId: req.body.gradeId,
    });
    res.status(201).json({
      message: 'Section Successfully created',
      sectionData: currentSection,
    });
  }
);

export default { createSection };
