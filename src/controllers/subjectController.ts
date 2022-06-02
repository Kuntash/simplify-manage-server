import { NextFunction, Request, Response } from 'express';
import {
  formParseAsync,
  gcpUploadFile,
  getBooleanFromString,
} from '../utils/index';

import SubjectModel from '../models/SubjectModel';
import { catchAsync } from '../utils/catchAsync';
import formidable from 'formidable';
import CustomError from '../utils/CustomError';

const createSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentSubOrg } = req.body;

    const [fields, files] = await formParseAsync(req);
    console.log('Fields --------');
    console.log(fields);
    console.log('Files ---------');
    console.log(files);
    const { subjectCode, subjectName, isMandatory, gradeId } = fields;
    const { syllabusFile }: { syllabusFile?: formidable.File } = files;

    if (!syllabusFile) throw new CustomError('Syllabus file not uploaded', 400);
    const syllabusUrl = await gcpUploadFile(
      'simplifymanage_bucket',
      syllabusFile?.filepath as string,
      `organisation/${currentSubOrg.orgId}/sub-orgs/subjects/${Date.now()}-${
        syllabusFile?.originalFilename
      }`
    );
    const newSubject = await SubjectModel.create({
      subjectCode,
      subjectName,
      gradeId,
      subOrgId: currentSubOrg._id,
      isMandatory: getBooleanFromString(isMandatory as string),
      syllabusUrl,
    });
    res.status(200).json({
      status: 'success',
      subjectData: newSubject,
    });
  }
);

const getAllSubjects = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allSubjects = await SubjectModel.find({
      subOrgId: req.body.currentSubOrg._id,
    });
    if (!allSubjects)
      res.status(404).json({
        status: 'No subject found.',
        message: 'No subject has been created thus far.',
      });
    res.status(200).json({
      totalSubjects: allSubjects.length,
      allSubjects,
    });
  }
);

const getSubjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = await SubjectModel.findById(req.params.subjectId);
    res.status(200).json({
      status: 'success',
      data: {
        subject,
      },
    });
  }
);

export default { createSubject, getAllSubjects, getSubjectById };
