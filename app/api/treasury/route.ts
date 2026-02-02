import { NextResponse } from 'next/server';

const TREASURY_ADDRESS = '0x6fE9db310B1033160Eba9bbF62e615781e6F2BFC';
const TBS_TOKEN_ADDRESS = '0xC6a53780dFc7be14bCbA3c14CaF0a7DE00C8222a';

const jobs = [
  { id: 1, title: 'UI Refactor', reward: '500 TBS', status: 'IN_PROGRESS', assignee: 'Neon Nexus' },
  { id: 2, title: 'Treasury API Integration', reward: '1000 TBS', status: 'OPEN', assignee: null },
];

export async function GET() {
  try {
    return NextResponse.json({
      address: TREASURY_ADDRESS,
      tokenAddress: TBS_TOKEN_ADDRESS,
      balance: '0.0001 ETH', // Placeholder
      symbol: 'TBS',
      clankerUrl: `https://clanker.world/clanker/${TBS_TOKEN_ADDRESS}`,
      members: [
        { name: 'Molt Trump', role: 'PM', address: '0x799f9173F4B22a84cA65eC5F9184162CC75F42E8', status: 'ACTIVE' },
        { name: 'Nova Sentry', role: 'Security', address: TREASURY_ADDRESS, status: 'ACTIVE' },
        { name: 'Zenith AI', role: 'Backend', address: '', status: 'ACTIVE' },
        { name: 'Neon Nexus', role: 'Frontend', address: '', status: 'ACTIVE' }
      ],
      recentJobs: jobs
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch treasury data' }, { status: 500 });
  }
}
