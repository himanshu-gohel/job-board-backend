import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { seedJobs } from './utils/seedJobs.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import 'express-async-errors';

const app = express();

// Ensure uploads directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(`/${uploadDir}`, express.static(uploadDir));

// Health
app.get('/', (req, res) => {
  res.json({
    name: 'JobBoard API',
    status: 'OK',
    docs: 'See README for usage',
    time: new Date().toISOString()
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

// 404 + Errors
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI in .env');
  process.exit(1);
}

connectDB(MONGO_URI)
  .then(seedJobs)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Startup error:', err);
    process.exit(1);
  });