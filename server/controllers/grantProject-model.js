import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const grantProjectSchema = new Schema(
  {
    npoName: String,
    npoURL: String,
    backgroundImage: String,
    grantProjectName: String,
    grantURL: String,
    description: String,
    grantorName: String,
    grantorURL: String,
    blobContainer: String,
    tag1: String,
    tag2: String,
    tag3: String,
    tag4: String,
    submitted: Boolean
    /* need to add the following: 
    due date: Date or String,
    chatbot or copilot URL: String or leave blank if back-end hasn't completed building it
    */

  },
  { autoIndex: false }
);

export const GrantProject = mongoose.model('GrantProject', grantProjectSchema);