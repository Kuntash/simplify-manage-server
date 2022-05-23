import mongoose, { Model } from 'mongoose';

interface IOrg {
  orgEmail: string;
  orgPassword?: string;
  orgName: string;
  subscriptionType: 'free-tier' | 'premium' | 'enterprise';
  subscriptionValidity?: Date;
  orgLocation: {
    country: string;
    address: string;
  };
  totalSubOrgs: number;
  createdAt: Date;
  updatedAt: Date;
}
const OrgSchema = new mongoose.Schema<IOrg>({
  orgEmail: { type: String, required: true, unique: true },
  orgPassword: { type: String, required: true, select: false },
  orgName: { type: String, required: true },
  subscriptionType: {
    type: String,
    default: 'free-tier',
    enum: ['free-tier', 'premium', 'enterprise'],
    required: true,
  },
  subscriptionValidity: Date,
  orgLocation: {
    country: {
      type: String,
      required: [true, 'An organisation must have a country name'],
    },
    address: {
      type: String,
      required: [true, 'An organisation must have an address'],
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  totalSubOrgs: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const OrgModel = mongoose.model<IOrg>('Org', OrgSchema);
