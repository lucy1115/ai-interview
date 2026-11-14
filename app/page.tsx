import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

const FEATURES = [
  {
    tag: "01",
    title: "依職缺量身出題",
    body: "貼上職缺描述，面試官會從技術能力、過往經驗到行為面向，出最貼近這份工作的題目。",
  },
  {
    tag: "02",
    title: "題數由你決定",
    body: "趕時間就練 1 題，想完整模擬就練到 10 題。每一次練習都照你的節奏走。",
  },
  {
    tag: "03",
    title: "逐題評分與建議",
    body: "結束後給你整體分數，也拆開每一題：哪裡答得好、哪裡可以更具體。",
  },
  {
    tag: "04",
    title: "每題附示範回答",
    body: "用 STAR 架構示範更好的答法，並結合你原本的回答改寫，看完就知道怎麼調整。",
  },
];

const STEPS = [
  { n: "1", title: "貼上職缺", body: "把想應徵的職缺描述貼進來，越完整，題目越精準。" },
  { n: "2", title: "選擇題數", body: "1 到 10 題任你選，面試官一次只問一題。" },
  { n: "3", title: "開口回答", body: "像真正的面試一樣，用文字寫下你的回答。" },
  { n: "4", title: "拿到回饋", body: "整體評分、逐題建議，加上每一題的示範回答。" },
];

const FAQS = [
  {
    q: "需要準備什麼？",
    a: "只需要一份職缺描述。可以直接從求職網站複製貼上，內容越完整，題目越貼近實際面試。",
  },
  {
    q: "一次可以練幾題？",
    a: "每次可以選 1 到 10 題。建議剛開始先練 3 題熟悉節奏，正式面試前再完整練一輪。",
  },
  {
    q: "示範回答可以直接背嗎？",
    a: "示範回答是幫你看見好的回答架構。建議套用架構，換成你自己的真實經驗與數據，面試時會更自然、更有說服力。",
  },
  {
    q: "回答是用打字還是講話？",
    a: "目前是用文字回答。按 Enter 送出、Shift+Enter 換行，練習時也能順便整理思緒。",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="paper-dots relative overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28">
            <div className="rise flex flex-col items-start gap-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-ink-2">
                <span className="size-1.5 rounded-full bg-accent" />
                AI 模擬面試 · 依職缺出題
              </span>
              <h1 className="font-serif text-5xl leading-[1.12] font-black tracking-tight text-ink sm:text-6xl lg:text-7xl">
                面試前，
                <br />
                先跟 AI
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">排練一次</span>
                  <span className="absolute inset-x-0 bottom-1.5 -z-0 h-3.5 -rotate-1 rounded-sm bg-accent/30 sm:h-4" />
                </span>
                。
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-ink-2">
                貼上職缺描述，AI 面試官會依照這份工作出題、逐題評分，並寫給你每一題「更好的回答方式」。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/practice"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink shadow-[0_12px_30px_-12px_var(--accent)] transition hover:-translate-y-0.5"
                >
                  免費開始練習
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link
                  href="#how"
                  className="rounded-full border border-line bg-card px-6 py-3.5 font-medium text-ink transition hover:border-ink"
                >
                  看看怎麼運作
                </Link>
              </div>
              <p className="text-sm text-muted">不用註冊 · 貼上職缺就能開始</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 border-y border-line bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHeading eyebrow="功能" title="不只是出題，" accent="是一位會帶你進步的面試官。" />
            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.tag} className="group flex flex-col gap-4 bg-card p-7 transition hover:bg-paper sm:p-9">
                  <span className="font-mono text-sm text-accent">{f.tag}</span>
                  <h3 className="font-serif text-2xl font-black text-ink">{f.title}</h3>
                  <p className="leading-relaxed text-ink-2">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHeading eyebrow="使用流程" title="四個步驟，" accent="五分鐘完成一場演練。" />
            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.n} className="relative flex flex-col gap-3 rounded-3xl border border-line bg-card p-6">
                  <span className="font-serif text-5xl font-black text-accent">{s.n}</span>
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{s.body}</p>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="absolute top-1/2 -right-4 hidden text-muted lg:block">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Feedback preview */}
        <section id="preview" className="scroll-mt-20 bg-ink text-paper">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">回饋範例</p>
              <h2 className="font-serif text-4xl leading-tight font-black sm:text-5xl">
                每一題，都告訴你
                <br />
                「可以怎麼答更好」。
              </h2>
              <p className="max-w-md leading-relaxed text-paper/70">
                面試結束後，你會拿到整體評分、逐題優缺點，以及用 STAR 架構寫成的示範回答——直接看見好答案長什麼樣子。
              </p>
              <ul className="mt-2 flex flex-col gap-3 text-paper/85">
                {["整體評分與優點", "逐題評分、優缺點與具體建議", "STAR 架構示範回答", "需要改進的地方"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid size-5 place-items-center rounded-full bg-accent text-[11px] text-accent-ink">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-paper/15 bg-paper/[0.04] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-paper/10 pb-5">
                <div>
                  <p className="text-xs text-paper/50">第 1 題</p>
                  <p className="mt-1 font-medium">請分享一個你主導過的 React 專案。</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-3 py-1 font-mono text-sm font-semibold text-accent-ink">
                  7 / 10
                </span>
              </div>
              <div className="grid gap-4 py-5 text-sm sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-paper/50">做得好</p>
                  <p className="leading-relaxed text-paper/85">清楚說明專案目的與使用的技術。</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-paper/50">可以更好</p>
                  <p className="leading-relaxed text-paper/85">補上遇到的困難、你的決策與量化成果。</p>
                </div>
              </div>
              <div className="rounded-2xl bg-paper p-5 text-sm leading-relaxed text-ink">
                <p className="mb-2 text-xs font-semibold tracking-wider text-accent">示範回答 · STAR</p>
                <p>
                  <b>情境：</b>團隊的後台頁面載入超過 4 秒……<b>任務：</b>我負責改善效能……
                  <b>行動：</b>拆分元件並加入快取……<b>結果：</b>載入時間降到 1.2 秒。
                </p>
              </div>
              <p className="mt-4 text-xs text-paper/40">＊以上為示意畫面，實際內容依你的職缺與回答產生。</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:py-28">
            <SectionHeading eyebrow="常見問題" title="還有疑問？" accent="這裡先幫你回答。" />
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition group-open:rotate-45 group-open:border-accent group-open:text-accent">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-12 leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:pb-28">
          <div className="paper-dots relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] border border-line bg-accent-soft px-6 py-16 text-center sm:py-20">
            <h2 className="font-serif text-4xl leading-tight font-black text-ink sm:text-5xl">
              下一場面試，
              <br className="sm:hidden" />
              從今天的排練開始。
            </h2>
            <p className="max-w-md text-ink-2">準備好職缺描述，五分鐘就能完成第一場模擬面試。</p>
            <Link
              href="/practice"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink"
            >
              立即開始練習
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight font-black text-ink sm:text-5xl">
        {title}
        <br />
        <span className="text-muted">{accent}</span>
      </h2>
    </div>
  );
}
