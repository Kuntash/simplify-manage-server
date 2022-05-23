import { model, Schema } from 'mongoose';

export interface IStudent {
  studentEmail: string;
  studentName: string;
  subOrgId: string;
  admissionNo: string;
  dateOfBirth: string;
  currentGrade: string;
  // subjectDetails
}
const StudentSchema = new Schema<IStudent>({});

const StudentModel = model<IStudent>('Student', StudentSchema);
export default StudentModel;
