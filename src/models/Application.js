import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['Submitted', 'In Review', 'Rejected', 'Accepted'], default: 'Submitted' },
  resumeSnapshot: {
    path: String,
    originalName: String,
    mimeType: String,
    size: Number
  },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ApplicationSchema.index({ user: 1, job: 1 }, { unique: true });

export default mongoose.model('Application', ApplicationSchema);