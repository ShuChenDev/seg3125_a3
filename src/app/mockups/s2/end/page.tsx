"use client";

import Link from "next/link";

const STATS = [
  ["Time",     "02:14"],
  ["Accuracy", "84%"],
  ["Misses",   "3"],
];

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 pt-24 pb-16">
      <div className="max-w-xl mx-auto">
        <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Run complete</div>
        <h1 className="text-3xl font-bold mb-8">6 × 6</h1>

        <div className="grid grid-cols-[1fr_auto] gap-8 items-end mb-10 border-b border-neutral-800 pb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500">Score</div>
            <div className="font-mono text-6xl text-cyan-300">12,480</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-neutral-500">Rank</div>
            <div className="font-mono text-6xl text-fuchsia-400">A</div>
          </div>
        </div>

        <ul className="space-y-2 mb-10">
          {STATS.map(([k, v]) => (
            <li key={k} className="flex justify-between border-b border-neutral-900 py-2 text-sm">
              <span className="text-neutral-400">{k}</span>
              <span className="font-mono text-neutral-100">{v}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-2">
          <Link href="/mockups/s2/play" className="py-2.5 text-center rounded bg-cyan-400 text-neutral-950 font-semibold hover:bg-cyan-300 text-sm">
            Retry
          </Link>
          <Link href="/mockups/s2/select" className="py-2.5 text-center rounded border border-neutral-700 hover:border-neutral-500 text-sm">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
