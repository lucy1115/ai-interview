import Link from "next/link";
import { ApiKeySettings } from "./ApiKeySettings";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg border-[3px] border-ink bg-card text-ink transition group-hover:rotate-[-6deg]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0.5" strokeLinejoin="round" />
          <circle cx="9" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="12" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="15" cy="9.5" r="0.6" fill="currentColor" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-lg font-black tracking-tight text-ink">Rehearse</span>
        <span className="rounded-md bg-ink px-1.5 py-0.5 font-display text-xs font-bold text-card">面試演練</span>
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
    <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-page/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-bold text-ink md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="underline-offset-4 transition hover:underline">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ApiKeySettings />
          {showCta ? (
            <Link href="/practice" className="btn-ink px-4 py-1.5 text-sm">
              開始練習
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <Link href="/" className="text-sm font-bold text-ink underline-offset-4 hover:underline">
              ← 回首頁
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
