"use client";

import Link from "next/link";

type CardState = "down" | "viewing" | "matched" | "mismatch";

const CARDS: { sym: string; state: CardState }[] = [
  { sym: "🐶", state: "matched" },  { sym: "🐱", state: "down" },    { sym: "🦊", state: "viewing" }, { sym: "🐰", state: "down" },
  { sym: "🐻", state: "down" },     { sym: "🐶", state: "matched" }, { sym: "🐼", state: "down" },    { sym: "🐨", state: "down" },
  { sym: "🐰", state: "down" },     { sym: "🦊", state: "mismatch" },{ sym: "🐱", state: "down" },    { sym: "🐼", state: "mismatch" },
  { sym: "🐯", state: "down" },     { sym: "🐨", state: "down" },    { sym: "🐻", state: "down" },    { sym: "🐯", state: "down" },
];

function Card({ sym, state }: { sym: string; state: CardState }) {
  if (state === "down") {
    return <div className="aspect-square rounded-lg bg-blue-600" />;
  }
  const border =
    state === "matched"  ? "border-green-500 bg-green-50" :
    state === "mismatch" ? "border-red-500 bg-red-50" :
                           "border-blue-600 bg-white";
  return (
    <div className={`aspect-square rounded-lg border-2 ${border} grid place-items-center text-4xl`}>
      {sym}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-50px)] bg-white px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex gap-6">
            <div><span className="text-neutral-500">Moves</span> <span className="font-semibold">14</span></div>
            <div><span className="text-neutral-500">Pairs</span> <span className="font-semibold">2 / 8</span></div>
          </div>
          <Link href="/mockups/s1/select" className="text-neutral-500 hover:text-neutral-900 underline">Restart</Link>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {CARDS.map((c, i) => <Card key={i} {...c} />)}
        </div>

        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Not a match — try again
        </div>

        <div className="mt-6 text-center">
          <Link href="/mockups/s1/end" className="text-blue-600 underline text-sm">Skip to end →</Link>
        </div>
      </div>
    </div>
  );
}
