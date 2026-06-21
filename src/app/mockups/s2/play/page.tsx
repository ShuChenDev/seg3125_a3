"use client";

import Link from "next/link";

type State = "down" | "peek" | "matched" | "wrong";
const CARDS: { sym: string; state: State }[] = [
  { sym: "α", state: "matched" }, { sym: "β", state: "down" },    { sym: "γ", state: "down" },    { sym: "δ", state: "wrong" },   { sym: "ε", state: "down" },    { sym: "ζ", state: "down" },
  { sym: "η", state: "down" },    { sym: "α", state: "matched" }, { sym: "θ", state: "down" },    { sym: "ι", state: "down" },    { sym: "κ", state: "wrong" },   { sym: "λ", state: "down" },
  { sym: "μ", state: "down" },    { sym: "ν", state: "down" },    { sym: "ξ", state: "matched" }, { sym: "ο", state: "down" },    { sym: "π", state: "down" },    { sym: "ρ", state: "down" },
  { sym: "σ", state: "down" },    { sym: "β", state: "down" },    { sym: "γ", state: "down" },    { sym: "ξ", state: "matched" }, { sym: "ε", state: "down" },    { sym: "ζ", state: "down" },
  { sym: "η", state: "down" },    { sym: "θ", state: "down" },    { sym: "ι", state: "down" },    { sym: "δ", state: "down" },    { sym: "λ", state: "down" },    { sym: "μ", state: "down" },
  { sym: "ν", state: "down" },    { sym: "ο", state: "down" },    { sym: "π", state: "down" },    { sym: "ρ", state: "down" },    { sym: "σ", state: "down" },    { sym: "κ", state: "down" },
];

function Card({ sym, state }: { sym: string; state: State }) {
  if (state === "down") {
    return <div className="aspect-square rounded border border-neutral-800 bg-neutral-900" />;
  }
  if (state === "peek") {
    return (
      <div className="aspect-square rounded bg-neutral-900 border border-cyan-400 grid place-items-center text-2xl text-cyan-300">
        {sym}
      </div>
    );
  }
  if (state === "matched") {
    return (
      <div className="aspect-square rounded bg-neutral-900 border border-fuchsia-500 grid place-items-center text-2xl text-fuchsia-300 opacity-70">
        {sym}
      </div>
    );
  }
  return (
    <div className="aspect-square rounded bg-neutral-900 border-2 border-dotted border-red-500 grid place-items-center text-2xl text-red-300">
      {sym}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-neutral-400 font-mono text-sm mb-6">6 × 6</div>

        <div className="grid grid-cols-6 gap-2">
          {CARDS.map((c, i) => <Card key={i} {...c} />)}
        </div>

        <div className="mt-6 text-center">
          <Link href="/mockups/s2/end" className="text-cyan-400 underline text-sm">Skip to end →</Link>
        </div>
      </div>
    </div>
  );
}
