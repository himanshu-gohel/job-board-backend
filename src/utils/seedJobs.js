import Job from '../models/Job.js';

export async function seedJobs() {
  const count = await Job.countDocuments();
  if (count > 0) return;

  await Job.insertMany([
    {
      title: 'Node.js Backend Engineer',
      company: 'Clothsy Technologies',
      location: 'Remote / India',
      type: 'Full-time',
      description: 'Build APIs, optimize MongoDB, write tests.'
    },
    {
      title: 'Frontend Developer (React/Next.js)',
      company: 'Atlas Web Labs',
      location: 'Bengaluru, IN',
      type: 'Full-time',
      description: 'Build dashboards, SSR with Next.js, Tailwind UI.'
    },
    {
      title: 'DevOps Engineer',
      company: 'Nova Cloud',
      location: 'Hyderabad, IN',
      type: 'Contract',
      description: 'CI/CD, Docker, Kubernetes on cloud.'
    }
  ]);
  console.log('🌱 Seeded default jobs');
}