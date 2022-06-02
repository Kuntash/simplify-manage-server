import { model, Schema } from 'mongoose';

export interface IStudent {
  studentProfileUrl?: string;
  studentEmail?: string;
  studentName: string;
  subOrgId: string;
  admissionNo: string;
  dateOfBirth: string;
  currentGrade: string;
  currentSection: string;
  fatherName?: string;
  motherName?: string;
  gender: string;
  type: string;
  // for day scholar enter day scholar otherwise mention the house no. // or hostel no.
  // subjectDetails
}
const StudentSchema = new Schema<IStudent>({});

const StudentModel = model<IStudent>('Student', StudentSchema);
export default StudentModel;
