import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const grantProjectSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    npoName: String,
    backgroundImage: String,
    grantProjectName: String,
    grantURL: String,
    description: String,
    grantorName: String,
    grantorURL: String,
    blobContainer: String,
    tags: Array,
    status: String
  },
  { autoIndex: false }
);

export const GrantProject = mongoose.model('GrantProject', grantProjectSchema);