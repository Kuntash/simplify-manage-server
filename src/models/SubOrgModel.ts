import mongoose, { Schema } from 'mongoose';

interface ISubOrg extends mongoose.Document {
  subOrgName: string;
  orgId: string;
  subOrgType: string;
  adminEmail: string;
  adminPassword?: string;
  adminName: string;
  // NOTE: adminProfileUrl can be set at a later stage, after the creation.
  adminProfileUrl?: string;
  subOrgDetails: string;
  affiliationNumber?: number;
  schoolCode?: number;
}
const SubOrgSchema = new Schema<ISubOrg>({
  subOrgName: {
    type: String,
    required: [true, 'A sub organisation should have a name'],
  },
  subOrgType: {
    type: String,
    required: true,
    enum: {
      values: ['school', 'company'],
      message: '{VALUE} is not an organisation type',
    },
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: 'Org',
  },
  affiliationNumber: Number,
  schoolCode: Number,
  subOrgDetails: {
    type: String,
    // minlength: 150,
    required: [true, 'Write some lines about this sub organisation'],
  },
  adminEmail: {
    unique: true,
    type: String,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
    select: false,
  },
  adminProfileUrl: String,
});

const SubOrgModel = mongoose.model<ISubOrg>('SubOrg', SubOrgSchema);

export default SubOrgModel;
