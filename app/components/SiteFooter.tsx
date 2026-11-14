import Link from "next/link";
import { Logo } from "./SiteHeader";

const COLUMNS = [
  {
    title: "產品",
    links: [
      { href: "/#features", label: "功能介紹" },
      { href: "/#how", label: "使用流程" },
      { href: "/#preview", label: "回饋範例" },
    ],
  },
  {
    title: "開始",
    links: [
      { href: "/practice", label: "立即練習" },
      { href: "/#faq", label: "常見問題" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-2">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-ink-2">
            貼上職缺描述，就有一位 AI 面試官陪你演練。依職缺出題、逐題評分，還會告訴你每一題怎麼答更好。
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-ink-2 transition hover:text-accent">
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Rehearse 面試演練</p>
          <p>AI 產生的回饋僅供練習參考，請搭配自己的真實經驗調整。</p>
        </div>
      </div>
    </footer>
  );
}
