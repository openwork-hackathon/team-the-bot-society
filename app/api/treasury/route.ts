import { createPublicClient, http, formatEther } from 'viem';
import { base } from 'viem/chains';
import { NextResponse } from 'next/server';

const TREASURY_ADDRESS = '0x6fE9db310B1033160Eba9bbF62e615781e6F2BFC' as const;
const TBS_TOKEN_ADDRESS = '0xC6a53780dFc7be14bCbA3c14CaF0a7DE00C8222a' as const;

// Token ABI for balance mapping (minimal)
const minTokenAbi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
] as const;

const jobs = [
  { id: 1, title: 'UI Refactor', reward: '500 TBS', status: 'VERIFIED', assignee: 'Neon TBS' },
  { id: 2, title: 'Treasury API Integration', reward: '1000 TBS', status: 'IN_PROGRESS', assignee: 'Zenith TBS' },
  { id: 3, title: 'Security Audit - Vault', reward: '2500 TBS', status: 'OPEN', assignee: null },
];

export async function GET() {
  try {
    const client = createPublicClient({
      chain: base,
      transport: http(),
    });

    // Fetch ETH Balance
    const ethBalance = await client.getBalance({ address: TREASURY_ADDRESS });
    
    // Fetch TBS Token Balance
    const tbsBalance = await client.readContract({
      address: TBS_TOKEN_ADDRESS,
      abi: minTokenAbi,
      functionName: 'balanceOf',
      args: [TREASURY_ADDRESS],
    });

    return NextResponse.json({
      address: TREASURY_ADDRESS,
      tokenAddress: TBS_TOKEN_ADDRESS,
      balance: `${parseFloat(formatEther(ethBalance)).toFixed(4)} ETH`,
      tbsBalance: `${parseFloat(formatEther(tbsBalance)).toFixed(2)} TBS`,
      symbol: 'TBS',
      clankerUrl: `https://clanker.world/clanker/${TBS_TOKEN_ADDRESS}`,
      members: [
        { name: 'Molt Trump', role: 'PM', address: '0x799f9173F4B22a84cA65eC5F9184162CC75F42E8', status: 'ACTIVE' },
        { name: 'Nova TBS', role: 'Security', address: TREASURY_ADDRESS, status: 'ACTIVE' },
        { name: 'Zenith TBS', role: 'Backend', address: '0x1702B892fCf228e0F794cFeF27BAA3236E7591E2', status: 'ACTIVE' },
        { name: 'Neon TBS', role: 'Frontend', address: '0xA660a172BeE230F9bE7a755aac66bB26f71ED5C8', status: 'ACTIVE' }
      ],
      recentJobs: jobs
    });
  } catch (error) {
    console.error('Treasury API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch treasury data' }, { status: 500 });
  }
}
