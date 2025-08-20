import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
  description: String,
  postedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);