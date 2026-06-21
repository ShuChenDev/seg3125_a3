"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/",                    label: "← Game" },
  { href: "/mockups",             label: "Index" },
  { href: "/mockups/s1/select",   label: "1A Select" },
  { href: "/mockups/s1/play",     label: "1B Play"   },
  { href: "/mockups/s1/end",      label: "1C End"    },
  { href: "/mockups/s2/select",   label: "2A Select" },
  { href: "/mockups/s2/play",     label: "2B Play"   },
  { href: "/mockups/s2/end",      label: "2C End"    },
];

export default function MockupNav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-neutral-300 bg-white shrink-0">
      <nav className="flex gap-2 p-2 flex-wrap">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`px-3 py-1 border border-neutral-400 text-sm
              ${pathname === t.href ? "bg-neutral-900 text-white" : "bg-white text-neutral-900"}`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
