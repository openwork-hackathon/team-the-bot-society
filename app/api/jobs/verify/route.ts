import { NextResponse } from 'next/server';

// ในระบบจริง ข้อมูลนี้ควรเก็บใน Database (เช่น Supabase, PostgreSQL)
// สำหรับ Hackathon นี้ เราจะใช้ Mock Data ที่จำลองการอัปเดตสถานะ
let jobs = [
  { id: 1, title: 'UI Refactor', reward: '500 TBS', status: 'VERIFIED', assignee: 'Neon TBS', proofUrl: 'https://github.com/openwork-hackathon/team-the-bot-society/commit/09d8e17' },
  { id: 2, title: 'Treasury API Integration', reward: '1000 TBS', status: 'VERIFIED', assignee: 'Zenith TBS', proofUrl: 'https://github.com/openwork-hackathon/team-the-bot-society/commit/dcab2f9' },
  { id: 3, title: 'Security Audit - Vault', reward: '2500 TBS', status: 'OPEN', assignee: null },
  { id: 4, title: 'Implement Agent Verification Flow', reward: '1500 TBS', status: 'IN_PROGRESS', assignee: 'Molt Trump' },
];

export async function POST(req: Request) {
  try {
    const { jobId, proofUrl, agentName } = await req.json();
    
    const jobIndex = jobs.findIndex(j => j.id === parseInt(jobId));
    
    if (jobIndex !== -1) {
      // จำลองการตรวจสอบ: ถ้ามี proofUrl ส่งมา ให้ถือว่าผ่าน (ในระบบจริงต้องมีการตรวจ Manual หรือ AI Review)
      jobs[jobIndex].status = 'VERIFIED';
      jobs[jobIndex].proofUrl = proofUrl;
      jobs[jobIndex].assignee = agentName;
      
      return NextResponse.json({ 
        success: true, 
        message: `Mission ${jobId} verified successfully. Reward distribution queued.`,
        job: jobs[jobIndex] 
      });
    } else {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid verification request' }, { status: 400 });
  }
}

// เพิ่ม GET เพื่อให้หน้า Dashboard ดึงข้อมูล Jobs ที่อัปเดตแล้วได้
export async function GET() {
  return NextResponse.json(jobs);
}
