import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-lg bg-ink text-paper transition group-hover:rotate-[-6deg]">
        <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0.5" strokeLinejoin="round" />
          <circle cx="9" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="12" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="15" cy="9.5" r="0.6" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-ink">
        Rehearse<span className="ml-1.5 font-serif text-sm font-semibold text-muted">面試演練</span>
      </span>
    </Link>
  );
}

const NAV = [
  { href: "/#features", label: "功能" },
  { href: "/#how", label: "使用流程" },
  { href: "/#preview", label: "回饋範例" },
  { href: "/#faq", label: "常見問題" },
];

export function SiteHeader({ showCta = true }: { showCta?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        {showCta ? (
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
          >
            開始練習
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <Link href="/" className="text-sm text-ink-2 transition hover:text-ink">
            ← 回首頁
          </Link>
        )}
      </div>
    </header>
  );
}
