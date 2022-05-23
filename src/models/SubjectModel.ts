import { model, Schema } from 'mongoose';

export interface ISubject {
  subjectCode: string;
  subjectName: string;
  isMandatory: boolean;
  gradeId: string;
  subOrgId: string;
  syllabusUrl: string;
}
const SubjectSchema = new Schema<ISubject>({});

const SubjectModel = model<ISubject>('Subject', SubjectSchema);
