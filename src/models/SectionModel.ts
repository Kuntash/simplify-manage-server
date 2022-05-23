import { model, Schema } from 'mongoose';

interface ISection {
  sectionName: string;
  gradeId: string;
}
const SectionSchema = new Schema<ISection>({
  sectionName: {
    type: String,
  },
  gradeId: Schema.Types.ObjectId,
});

const SectionModel = model<ISection>('Section', SectionSchema);
export default SectionModel;
