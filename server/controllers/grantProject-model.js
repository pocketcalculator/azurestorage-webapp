import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const grantProjectSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    npoName: String,
    grantProjectName: String,
    description: String,
    url: String,
    blobContainer: String
  },
  { autoIndex: false }
);

export const GrantProject = mongoose.model('GrantProject', grantProjectSchema);