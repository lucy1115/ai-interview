import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter, TagBadge } from "./components/SiteFooter";
import { HeroIllustration } from "./components/HeroIllustration";

const FEATURES = [
  {
    tag: "01",
    color: "bg-peach",
    title: "依職缺量身出題",
    body: "貼上職缺描述，面試官會從技術能力、過往經驗到行為面向，出最貼近這份工作的題目。",
  },
  {
    tag: "02",
    color: "bg-lemon",
    title: "題數由你決定",
    body: "趕時間就練 1 題，想完整模擬就練到 10 題。每一次練習都照你的節奏走。",
  },
  {
    tag: "03",
    color: "bg-mint",
    title: "逐題評分與建議",
    body: "結束後給你整體分數，也拆開每一題：哪裡答得好、哪裡可以更具體。",
  },
  {
    tag: "04",
    color: "bg-[#8fb0f0]",
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
    a: "一份職缺描述，以及你自己的 OpenAI API Key（在右上角設定，只會存在你的瀏覽器）。職缺描述可以直接從求職網站複製貼上，內容越完整，題目越貼近實際面試。",
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

const HIGHLIGHTS = [
  { zh: "依職缺出題", en: "Questions for your job" },
  { zh: "逐題評分", en: "Every answer scored" },
  { zh: "STAR 示範回答", en: "Model answers" },
  { zh: "自備 API Key", en: "Bring your own key" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-24">
            <div className="rise flex flex-col items-start gap-7">
              <span className="rounded-md bg-ink px-3 py-1 font-display text-xs font-bold tracking-widest text-card">
                AI 模擬面試 · 依職缺出題
              </span>

              <div className="bubble w-full px-6 py-7 sm:px-9 sm:py-9">
                <h1 className="font-display text-4xl leading-[1.25] font-black tracking-wider text-ink sm:text-5xl lg:text-[3.4rem]">
                  面試前，
                  <br />
                  先跟 AI 排練一次！
                </h1>
                <p className="mt-4 font-display text-lg font-bold tracking-wide text-ink-2 sm:text-xl">
                  不慌張、不硬背，從容地上場。
                </p>
              </div>

              <ul className="mt-2 grid w-full grid-cols-2 gap-y-3 sm:grid-cols-4">
                {HIGHLIGHTS.map((h) => (
                  <li key={h.zh} className="border-l-2 border-ink px-3">
                    <p className="text-sm font-bold text-ink">{h.zh}</p>
                    <p className="text-[11px] leading-tight text-ink-2">{h.en}</p>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/practice" className="btn-ink group px-7 py-3">
                  免費開始練習
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link href="#how" className="btn-line px-6 py-3">
                  看看怎麼運作
                </Link>
              </div>
              <p className="text-sm font-medium text-ink-2">不用註冊 · 使用你自己的 OpenAI API Key</p>
            </div>
            <HeroIllustration className="rise mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none" />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <SectionHeading eyebrow="功能" title="不只是出題，" accent="是一位會帶你進步的面試官。" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.tag} className="comic overflow-hidden">
                  <div className="halftone flex items-center gap-4 border-b-[3px] border-ink px-6 py-4 sm:px-7">
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-ink font-display text-lg font-black text-on-color ${f.color}`}
                    >
                      {f.tag}
                    </span>
                    <h3 className="font-display text-xl font-black tracking-wide text-ink sm:text-2xl">{f.title}</h3>
                  </div>
                  <p className="px-6 py-5 leading-relaxed text-ink-2 sm:px-7">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works：四格漫畫 */}
        <section id="how" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <SectionHeading eyebrow="使用流程" title="四個步驟，" accent="五分鐘完成一場演練。" />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <li key={s.n} className="comic flex flex-col overflow-hidden">
                  <div className="halftone grid h-28 place-items-center border-b-[3px] border-ink">
                    <span className="grid size-16 place-items-center rounded-full border-[3px] border-ink bg-card font-display text-3xl font-black text-ink">
                      {s.n}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-black tracking-wide text-ink">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Feedback preview */}
        <section id="preview" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
          <div className="comic halftone mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-10 lg:grid-cols-2 lg:py-14">
            <div className="flex flex-col gap-5">
              <span className="self-start rounded-md bg-ink px-3 py-1 font-display text-xs font-bold tracking-widest text-card">
                回饋範例
              </span>
              <h2 className="font-display text-3xl leading-snug font-black tracking-wide text-ink sm:text-4xl">
                每一題，都告訴你
                <br />
                「可以怎麼答更好」。
              </h2>
              <p className="max-w-md leading-relaxed text-ink-2">
                面試結束後，你會拿到整體評分、逐題優缺點，以及用 STAR 架構寫成的示範回答——直接看見好答案長什麼樣子。
              </p>
              <ul className="mt-1 flex flex-col gap-3 font-medium text-ink">
                {["整體評分與優點", "逐題評分、優缺點與具體建議", "STAR 架構示範回答", "需要改進的地方"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-card">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <Avatar />
                <div className="bubble bubble-left px-4 py-3 text-sm leading-relaxed text-ink">
                  <b>第 1 題：</b>請分享一個你主導過的 React 專案。
                </div>
              </div>

              <div className="comic p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4">
                  <p className="font-display font-black text-ink">第 1 題 回饋</p>
                  <span className="rounded-full border-[3px] border-ink bg-peach px-3 py-0.5 font-display text-sm font-black text-on-color">
                    7 / 10
                  </span>
                </div>
                <div className="grid gap-4 py-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-bold text-ink-2">◎ 做得好</p>
                    <p className="leading-relaxed text-ink">清楚說明專案目的與使用的技術。</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold text-ink-2">△ 可以更好</p>
                    <p className="leading-relaxed text-ink">補上遇到的困難、你的決策與量化成果。</p>
                  </div>
                </div>
                <div className="rounded-xl border-2 border-ink bg-mint-soft p-4 text-sm leading-relaxed text-ink">
                  <p className="mb-1.5 font-display text-xs font-black tracking-wider">示範回答 · STAR</p>
                  <p>
                    <b>情境：</b>團隊的後台頁面載入超過 4 秒……<b>任務：</b>我負責改善效能……
                    <b>行動：</b>拆分元件並加入快取……<b>結果：</b>載入時間降到 1.2 秒。
                  </p>
                </div>
              </div>
              <p className="text-xs text-ink-2">＊以上為示意畫面，實際內容依你的職缺與回答產生。</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:py-24">
            <SectionHeading eyebrow="常見問題" title="還有疑問？" accent="這裡先幫你回答。" />
            <div className="flex flex-col gap-4">
              {FAQS.map((f) => (
                <details key={f.q} className="comic group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center gap-3 font-display text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-black text-card">
                      Q
                    </span>
                    <span className="flex-1">{f.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border-[3px] border-ink text-ink transition group-open:rotate-45 group-open:bg-lemon group-open:text-on-color">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 flex gap-3 border-t-2 border-dashed border-ink/30 pt-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-peach text-sm font-black text-on-color">
                      A
                    </span>
                    <p className="leading-relaxed text-ink-2">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="comic halftone mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-5 py-12 text-center sm:py-16">
            <div className="bubble max-w-2xl px-6 py-7 sm:px-10">
              <h2 className="font-display text-3xl leading-snug font-black tracking-wider text-ink sm:text-5xl">
                下一場面試，
                <br className="sm:hidden" />
                從今天的排練開始！
              </h2>
              <p className="mt-3 font-bold text-ink-2">準備好職缺描述，五分鐘就能完成第一場模擬面試。</p>
            </div>
            <Link href="/practice" className="btn-ink group mt-2 px-8 py-3.5 text-lg">
              立即開始練習
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <TagBadge />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Avatar() {
  return (
    <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-card font-display text-sm font-black text-ink">
      面
    </span>
  );
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div className="flex max-w-2xl flex-col items-start gap-4">
      <span className="rounded-md bg-ink px-3 py-1 font-display text-xs font-bold tracking-widest text-card">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl leading-snug font-black tracking-wide text-ink sm:text-[2.6rem]">
        {title}
        <br />
        <span className="bg-[linear-gradient(transparent_62%,var(--marker)_62%)] box-decoration-clone">{accent}</span>
      </h2>
    </div>
  );
}
