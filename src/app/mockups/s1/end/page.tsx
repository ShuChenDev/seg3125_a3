"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-50px)] bg-white px-8 py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">You did it</h1>
        <p className="text-neutral-500 mb-8">Medium</p>

        <div className="flex justify-center gap-2 text-4xl mb-10">
          <span className="text-yellow-500">★</span>
          <span className="text-yellow-500">★</span>
          <span className="text-neutral-300">★</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10 text-center">
          <div className="border border-neutral-200 rounded-lg p-3">
            <div className="text-xs text-neutral-500 uppercase">Moves</div>
            <div className="text-xl font-semibold">24</div>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3">
            <div className="text-xs text-neutral-500 uppercase">Accuracy</div>
            <div className="text-xl font-semibold">67%</div>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/mockups/s1/play" className="block py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Play again
          </Link>
          <Link href="/mockups/s1/select" className="block py-3 rounded-lg border border-neutral-300 hover:border-neutral-500">
            Change settings
          </Link>
        </div>
      </div>
    </div>
  );
}
