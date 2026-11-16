import Link from "next/link";
import { Logo } from "./SiteHeader";

const LINKS = [
  { href: "/#features", label: "功能介紹" },
  { href: "/#how", label: "使用流程" },
  { href: "/#preview", label: "回饋範例" },
  { href: "/#faq", label: "常見問題" },
  { href: "/practice", label: "立即練習" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-[3px] border-ink bg-page">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <Logo />
        <nav className="flex flex-wrap justify-center divide-x-2 divide-ink text-sm font-bold text-ink">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 underline-offset-4 hover:underline sm:px-4">
              {l.label}
            </Link>
          ))}
        </nav>
        <TagBadge />
        <div className="flex flex-col gap-1 text-xs text-ink-2">
          <p>AI 產生的回饋僅供練習參考，請搭配自己的真實經驗調整。</p>
          <p>© 2026 Rehearse 面試演練</p>
        </div>
      </div>
    </footer>
  );
}

/** 海報底部那種黑色口號標籤 */
export function TagBadge() {
  return (
    <div className="inline-flex flex-col items-center rounded-lg bg-ink px-5 py-1.5 text-card">
      <span className="font-display text-sm font-black tracking-widest">隨時都能練　每份職缺都能練！</span>
      <span className="text-[10px] font-semibold tracking-wide opacity-80">Practice anytime, for any job.</span>
    </div>
  );
}
