import { model, Schema } from 'mongoose';
import { ISubject } from './SubjectModel';

interface ITeacher {
  teacherEmail: string;
  teacherPhoneNo: number;
  subOrgId: string;
  subjectsTaught: string[];
  sectionsAssigned: string[];
}
const TeacherSchema = new Schema({});

const TeacherModel = model('Teacher', TeacherSchema);
