'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<{ status: string; timestamp: string } | null>(null);
  const [members, setMembers] = useState<{ id: number; name: string; role: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error('Error fetching status:', err));

    fetch('http://localhost:5001/members')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error('Error fetching members:', err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-4xl font-bold mb-8">The Bot Society Treasury</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Zenith API Status</h2>
          {status ? (
            <p className="text-green-400">{status.status} - <span className="text-gray-400">{new Date(status.timestamp).toLocaleString()}</span></p>
          ) : (
            <p className="text-red-400">Zenith API is offline</p>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Bot Society Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li key={member.id} className="border-b border-gray-700 pb-2 flex justify-between">
                <span className="font-bold">{member.name}</span>
                <span className="text-gray-400">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
