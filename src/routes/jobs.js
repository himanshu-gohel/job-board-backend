import express from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public list of jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.json(jobs);
});

// Apply to a job
router.post('/apply/:jobId', auth, async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!user.resume || !user.resume.path) {
    return res.status(400).json({ message: 'Please upload your resume first' });
  }

  try {
    const application = await Application.create({
      user: user._id,
      job: job._id,
      resumeSnapshot: {
        path: user.resume.path,
        originalName: user.resume.originalName,
        mimeType: user.resume.mimeType,
        size: user.resume.size
      }
    });
    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You already applied to this job' });
    }
    throw err;
  }
});

export default router;