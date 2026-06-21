"use client";

import { useState } from "react";
import Link from "next/link";

const LEVELS = [
  { id: "easy",   name: "Easy",   grid: "4 × 4", pairs: 8 },
  { id: "medium", name: "Medium", grid: "6 × 4", pairs: 12 },
  { id: "hard",   name: "Hard",   grid: "6 × 6", pairs: 18 },
];

export default function Page() {
  const [level, setLevel] = useState("medium");

  return (
    <div className="min-h-[calc(100vh-50px)] bg-white px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">New game</h1>
        <p className="text-neutral-500 mb-10">Pick a difficulty.</p>

        <h2 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">Difficulty</h2>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {LEVELS.map((l) => {
            const on = level === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`p-4 rounded-lg border text-left transition
                  ${on ? "border-blue-600 bg-blue-50" : "border-neutral-300 hover:border-neutral-500"}`}
              >
                <div className="text-lg font-semibold">{l.name}</div>
                <div className="text-sm text-neutral-500">{l.grid} · {l.pairs} pairs</div>
              </button>
            );
          })}
        </div>

        <Link
          href="/mockups/s1/play"
          className="block w-full text-center py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Start game
        </Link>
      </div>
    </div>
  );
}
