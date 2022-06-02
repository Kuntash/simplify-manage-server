import { model, Schema } from 'mongoose';

export interface ISubject {
  subjectCode: string;
  subjectName: string;
  isMandatory: boolean;
  gradeId: string;
  subOrgId: string;
  syllabusUrl: string;
}
const SubjectSchema = new Schema<ISubject>({
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  isMandatory: {
    type: Boolean,
    required: true,
  },
  gradeId: { type: Schema.Types.ObjectId, ref: 'Grade' },
  subOrgId: { type: Schema.Types.ObjectId, ref: 'SubOrg' },
  syllabusUrl: {
    type: String,
    required: true,
  },
});

const SubjectModel = model<ISubject>('Subject', SubjectSchema);
export default SubjectModel;
