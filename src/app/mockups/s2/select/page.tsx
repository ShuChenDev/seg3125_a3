"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [grid, setGrid] = useState(6);
  const [peek, setPeek] = useState(0.8);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 pt-24 pb-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">Configure run</h1>
        <p className="text-neutral-500 text-sm mb-10">Tune the rules before launch.</p>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-neutral-400">Grid size</span>
              <span className="font-mono text-cyan-400">{grid} × {grid}</span>
            </div>
            <input
              type="range" min={4} max={8} step={2} value={grid}
              onChange={(e) => setGrid(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-neutral-400">Peek duration</span>
              <span className="font-mono text-cyan-400">{peek.toFixed(1)}s</span>
            </div>
            <input
              type="range" min={0.3} max={2} step={0.1} value={peek}
              onChange={(e) => setPeek(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/mockups/s2/play"
            className="px-6 py-2.5 rounded bg-cyan-400 text-neutral-950 font-semibold hover:bg-cyan-300"
          >
            Launch →
          </Link>
        </div>
      </div>
    </div>
  );
}
