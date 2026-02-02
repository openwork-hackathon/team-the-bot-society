'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/treasury')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      <header className="border-b border-green-900 pb-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">THE BOT SOCIETY // DASHBOARD</h1>
        <p className="text-xs text-green-800 opacity-50">EST. 2026 // BASE MAINNET</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Treasury Section */}
        <section className="border border-green-900 p-6 bg-zinc-950">
          <h2 className="text-xl mb-4 text-white uppercase border-b border-green-900">Treasury Status</h2>
          <div className="space-y-2">
            <p><span className="text-zinc-500">Address:</span> {data?.address || 'Loading...'}</p>
            <p><span className="text-zinc-500">Token Contract:</span> <a href={data?.clankerUrl} target="_blank" className="text-green-400 underline">{data?.tokenAddress || 'N/A'}</a></p>
            <p className="text-3xl font-bold text-green-400">{data?.balance || '0.00'}</p>
            <p><span className="text-zinc-500">Token:</span> ${data?.symbol || 'N/A'}</p>
          </div>
        </section>

        {/* Members Section */}
        <section className="border border-green-900 p-6 bg-zinc-950">
          <h2 className="text-xl mb-4 text-white uppercase border-b border-green-900">Society Members</h2>
          <ul className="space-y-4">
            {data?.members.map((m: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <div>
                  <p className="font-bold">{m.name}</p>
                  <p className="text-xs text-zinc-500">{m.role}</p>
                </div>
                <div className="text-xs text-green-900">
                  {m.address ? m.address.slice(0, 6) + '...' + m.address.slice(-4) : 'OFFLINE'}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Labor Market Section */}
        <section className="border border-green-900 p-6 bg-zinc-950 md:col-span-2">
          <h2 className="text-xl mb-4 text-white uppercase border-b border-green-900">Labor Market // Bounties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.recentJobs?.map((j: any) => (
              <div key={j.id} className="border border-green-900/50 p-4 bg-black/50">
                <p className="text-white font-bold">{j.title}</p>
                <p className="text-green-400 text-lg">{j.reward}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${j.status === 'OPEN' ? 'bg-green-900/30 text-green-400' : j.status === 'VERIFIED' ? 'bg-blue-900/30 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    {j.status}
                  </span>
                  <span className="text-[10px] text-zinc-600">Assignee: {j.assignee || 'NONE'}</span>
                </div>
                {j.status === 'IN_PROGRESS' && (
                  <button className="mt-2 w-full border border-green-900 text-[10px] py-1 hover:bg-green-900/20 transition-colors">
                    SUBMIT PROOF
                  </button>
                )}
                {j.status === 'VERIFIED' && j.proofUrl && (
                  <a href={j.proofUrl} target="_blank" className="mt-2 block text-center text-[10px] text-blue-400 underline">
                    VIEW PROOF
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-12 text-center text-xs text-zinc-700">
        <p>[SOCIETY_DAEMON_V1.0.0] SYSTEM_HEALTH: OPTIMAL</p>
      </footer>
    </div>
  );
}
