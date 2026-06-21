import Link from "next/link";

const ROWS = [
  {
    title: "Storyboard 1 — Light, click-flip",
    persona: "For Maya (9, casual)",
    links: [
      ["/mockups/s1/select", "1A Select"],
      ["/mockups/s1/play",   "1B Play"],
      ["/mockups/s1/end",    "1C End"],
    ],
  },
  {
    title: "Storyboard 2 — Dark, hold-to-peek",
    persona: "For Daniel (27, gamer)",
    links: [
      ["/mockups/s2/select", "2A Select"],
      ["/mockups/s2/play",   "2B Play"],
      ["/mockups/s2/end",    "2C End"],
    ],
  },
];

export default function MockupsIndex() {
  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-1">Card Magic — storyboard mockups</h1>
      <p className="text-neutral-600 mb-8">
        Six mockup screens across two storyboards. The shipped game lives at{" "}
        <Link href="/" className="text-blue-600 underline">/</Link>.
      </p>

      <div className="space-y-8">
        {ROWS.map((r) => (
          <section key={r.title}>
            <h2 className="font-semibold">{r.title}</h2>
            <p className="text-sm text-neutral-500 mb-3">{r.persona}</p>
            <ul className="space-y-1">
              {r.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-blue-600 underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
