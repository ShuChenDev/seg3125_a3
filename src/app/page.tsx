"use client";

import { useEffect, useRef, useState } from "react";

type Screen = "settings" | "play" | "end";
type Difficulty = "easy" | "medium" | "hard";

const LEVELS: { id: Difficulty; name: string; grid: string; cols: number; pairs: number }[] = [
  { id: "easy",   name: "Easy",   grid: "4 × 4", cols: 4, pairs: 8 },
  { id: "medium", name: "Medium", grid: "4 × 6", cols: 6, pairs: 12 },
  { id: "hard",   name: "Hard",   grid: "6 × 6", cols: 6, pairs: 18 },
];

const EMOJIS = ["🦊","🐻","🐼","🐯","🐰","🐱","🐶","🐨","🦁","🐵","🐸","🐷","🦄","🐮","🐹","🐺","🦝","🐗"];

type Card = { id: number; sym: string; flipped: boolean; matched: boolean };

function buildDeck(pairs: number): Card[] {
  const syms = EMOJIS.slice(0, pairs);
  const doubled = [...syms, ...syms];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((sym, idx) => ({ id: idx, sym, flipped: false, matched: false }));
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function CardView({
  card,
  isWrong,
  disabled,
  onClick,
}: {
  card: Card;
  isWrong: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  if (card.matched) {
    return (
      <div
        className="aspect-square rounded bg-neutral-900 border border-fuchsia-500 grid place-items-center text-3xl opacity-80"
        style={{ boxShadow: "0 0 22px rgba(232,121,249,.45)" }}
      >
        {card.sym}
      </div>
    );
  }
  if (isWrong) {
    return (
      <div
        className="aspect-square rounded bg-neutral-900 border-2 border-dotted border-white grid place-items-center text-3xl text-white"
        style={{ boxShadow: "0 0 18px rgba(255,255,255,.25)" }}
      >
        {card.sym}
      </div>
    );
  }
  if (card.flipped) {
    return (
      <div
        className="aspect-square rounded bg-neutral-900 border border-white grid place-items-center text-3xl text-white"
        style={{ boxShadow: "0 0 18px rgba(255,255,255,.2)" }}
      >
        {card.sym}
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="aspect-square rounded border border-neutral-800 bg-neutral-900 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(34,211,238,.25)] disabled:cursor-not-allowed"
    />
  );
}

export default function Prototype() {
  const [screen, setScreen] = useState<Screen>("settings");
  const [level, setLevel] = useState<Difficulty>("medium");
  const [deck, setDeck] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [endStats, setEndStats] = useState({ moves: 0, elapsed: 0, pairs: 0 });
  const [peekDuration, setPeekDuration] = useState(0.8);
  const flipBackRef = useRef<number | null>(null);

  const conf = LEVELS.find((l) => l.id === level)!;

  // live timer
  useEffect(() => {
    if (screen !== "play") return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [screen, startTime]);

  // win detection
  useEffect(() => {
    if (screen === "play" && conf.pairs > 0 && matchedPairs === conf.pairs) {
      setEndStats({ moves, elapsed, pairs: conf.pairs });
      setScreen("end");
    }
  }, [matchedPairs, conf.pairs, screen, moves, elapsed]);

  function startGame(lvl: Difficulty) {
    if (flipBackRef.current) clearTimeout(flipBackRef.current);
    const c = LEVELS.find((l) => l.id === lvl)!;
    setLevel(lvl);
    setDeck(buildDeck(c.pairs));
    setSelected([]);
    setWrongIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setStartTime(Date.now());
    setElapsed(0);
    setScreen("play");
  }

  function retry() {
    if (flipBackRef.current) clearTimeout(flipBackRef.current);
    setDeck(buildDeck(conf.pairs));
    setSelected([]);
    setWrongIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setStartTime(Date.now());
    setElapsed(0);
  }

  function onCardClick(id: number) {
    const card = deck.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;

    // If a mismatched pair is still showing, snap it back immediately
    // and start a fresh selection with the clicked card — no waiting.
    if (wrongIds.length > 0) {
      if (flipBackRef.current) {
        clearTimeout(flipBackRef.current);
        flipBackRef.current = null;
      }
      const wIds = wrongIds;
      setDeck((d) =>
        d.map((c) => {
          if (wIds.includes(c.id)) return { ...c, flipped: false };
          if (c.id === id) return { ...c, flipped: true };
          return c;
        })
      );
      setWrongIds([]);
      setSelected([id]);
      return;
    }

    if (selected.length >= 2) return;

    const nextDeck = deck.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const nextSel = [...selected, id];
    setDeck(nextDeck);
    setSelected(nextSel);

    if (nextSel.length === 2) {
      const [a, b] = nextSel.map((sid) => nextDeck.find((c) => c.id === sid)!);
      setMoves((m) => m + 1);
      if (a.sym === b.sym) {
        setDeck((d) =>
          d.map((c) => (c.id === a.id || c.id === b.id ? { ...c, matched: true } : c))
        );
        setMatchedPairs((p) => p + 1);
        setSelected([]);
      } else {
        setWrongIds([a.id, b.id]);
        flipBackRef.current = window.setTimeout(() => {
          setDeck((d) =>
            d.map((c) => (c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c))
          );
          setWrongIds([]);
          setSelected([]);
          flipBackRef.current = null;
        }, peekDuration * 1000);
      }
    }
  }

  const accuracy = moves === 0 ? 0 : Math.round((matchedPairs / moves) * 100);
  const endAccuracy =
    endStats.moves === 0 ? 0 : Math.round((endStats.pairs / endStats.moves) * 100);

  const stars = (() => {
    if (endStats.pairs === 0) return 0;
    const ratio = endStats.moves / endStats.pairs;
    if (ratio <= 1.4) return 3;
    if (ratio <= 1.9) return 2;
    return 1;
  })();

  const score = Math.max(
    0,
    endStats.pairs * 1000 - endStats.moves * 40 - endStats.elapsed * 8
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {screen === "settings" && (
        <section className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md">
            <h1 className="text-6xl font-extrabold tracking-tight mb-3 text-white">
              Card Magic
            </h1>
            <p className="text-neutral-500 mb-12">Match every pair. Beat your time.</p>

            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Difficulty
            </div>
            <div className="space-y-2 mb-10">
              {LEVELS.map((l) => {
                const on = level === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`w-full flex items-baseline justify-between px-5 py-4 rounded transition text-left
                      ${on
                        ? "bg-white text-neutral-950"
                        : "border border-neutral-800 hover:border-neutral-600"}`}
                  >
                    <span className="text-lg font-semibold">{l.name}</span>
                    <span className="font-mono text-sm text-neutral-500">
                      {l.grid} · {l.pairs} pairs
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mb-12">
              <div className="flex justify-between text-xs uppercase tracking-widest text-neutral-500 mb-3">
                <span>Card peek duration</span>
                <span className="font-mono text-cyan-300">{peekDuration.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={2.5}
                step={0.1}
                value={peekDuration}
                onChange={(e) => setPeekDuration(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <p className="text-xs text-neutral-600 mt-2">
                How long a mismatched pair stays visible before flipping back.
              </p>
            </div>

            <button
              onClick={() => startGame(level)}
              className="w-full py-4 rounded bg-white text-neutral-950 font-semibold"
            >
              Start
            </button>
          </div>
        </section>
      )}

      {screen === "play" && (
        <>
          <header className="border-b border-neutral-900 px-8 py-4 flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <span className="text-lg font-bold text-white">
                Card Magic
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">
                {conf.name} · {conf.grid}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={retry}
                className="px-4 py-1.5 rounded border border-neutral-700 hover:border-white text-sm transition"
              >
                Retry
              </button>
              <button
                onClick={() => setScreen("settings")}
                className="px-4 py-1.5 rounded border border-neutral-700 hover:border-white text-sm transition"
              >
                Settings
              </button>
            </div>
          </header>

          <section className="flex-1 flex flex-col items-center px-8 pt-12 pb-12">
            <div className="w-full max-w-3xl">
              <div className="flex gap-10 font-mono mb-10 justify-end">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Time</div>
                  <div className="text-2xl">{fmtTime(elapsed)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Moves</div>
                  <div className="text-2xl">{moves}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Pairs</div>
                  <div className="text-2xl">{matchedPairs} / {conf.pairs}</div>
                </div>
              </div>

              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${conf.cols}, minmax(0,1fr))` }}
              >
                {deck.map((c) => (
                  <CardView
                    key={c.id}
                    card={c}
                    isWrong={wrongIds.includes(c.id)}
                    disabled={selected.length >= 2 && wrongIds.length === 0}
                    onClick={() => onCardClick(c.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {screen === "end" && (
        <section className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Run complete
            </div>
            <h2 className="text-3xl font-bold mb-10">{conf.name} · {conf.grid}</h2>

            <div className="flex items-end justify-between border-b border-neutral-800 pb-8 mb-10">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500">Score</div>
                <div className="font-mono text-6xl text-cyan-300">
                  {score.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-neutral-500">Grade</div>
                <div className="font-mono text-6xl text-fuchsia-400">
                  {stars === 3 ? "A" : stars === 2 ? "B" : "C"}
                </div>
              </div>
            </div>

            <ul className="space-y-2 mb-12">
              {[
                ["Time",     fmtTime(endStats.elapsed)],
                ["Moves",    String(endStats.moves)],
                ["Accuracy", `${endAccuracy}%`],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex justify-between border-b border-neutral-900 py-2 text-sm"
                >
                  <span className="text-neutral-400">{k}</span>
                  <span className="font-mono">{v}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <button
                onClick={() => startGame(level)}
                className="w-full py-3 rounded bg-white text-neutral-950 font-semibold"
              >
                Play again
              </button>
              <button
                onClick={() => setScreen("settings")}
                className="w-full py-3 rounded border border-neutral-700 hover:border-neutral-500 transition"
              >
                Change difficulty
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
