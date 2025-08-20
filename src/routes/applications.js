import express from 'express';
import Application from '../models/Application.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const apps = await Application.find({ user: req.userId })
    .populate('job', 'title company location type postedAt');
  res.json(apps);
});

export default router;