import { NextResponse } from 'next/server';

const jobs = [
  { id: 1, title: 'UI Refactor', reward: '500 TBS', status: 'IN_PROGRESS', assignee: 'Neon Nexus' },
  { id: 2, title: 'Treasury API Integration', reward: '1000 TBS', status: 'OPEN', assignee: null },
];

export async function POST(req: Request) {
  try {
    const { jobId, proofUrl } = await req.json();
    const job = jobs.find(j => j.id === parseInt(jobId));
    if (job) {
      job.status = 'VERIFIED';
      // Note: In a real app, this would be persisted in a DB
      return NextResponse.json({ success: true, job });
    } else {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
