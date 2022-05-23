import { model, Schema } from 'mongoose';
import { IGrade } from '../types';

const GradeSchema = new Schema<IGrade>({
  subOrgId: Schema.Types.ObjectId,
  value: Number,
});

const GradeModel = model<IGrade>('Grade', GradeSchema);

export default GradeModel;
