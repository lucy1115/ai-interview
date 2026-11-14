"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 10;
const DEFAULT_QUESTIONS = 3;

function clampQuestionCount(value: string) {
  const n = Math.floor(Number(value));
  if (!value.trim() || !Number.isFinite(n)) return DEFAULT_QUESTIONS;
  return Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, n));
}

// 把 **文字** 顯示成粗體，其餘文字原樣保留
function renderBold(text: string) {
  return text.split(/(\*\*[^*\n]+\*\*)/g).map((part, i) =>
    part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default function PracticePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [questionCountInput, setQuestionCountInput] = useState(String(DEFAULT_QUESTIONS));
  const questionCount = clampQuestionCount(questionCountInput);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(history: ChatMessage[]) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, messages: history, questionCount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "發生錯誤");
      setMessages([...history, { role: "assistant", content: data.reply }]);
      setFinished(Boolean(data.finished));
    } catch (e) {
      setError(e instanceof Error ? e.message : "發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  function startInterview() {
    if (!jobDescription.trim()) return;
    setQuestionCountInput(String(questionCount));
    setStarted(true);
    setMessages([]);
    send([]);
  }

  function submitAnswer(text: string) {
    if (!text.trim() || loading || finished) return;
    const history: ChatMessage[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(history);
    setAnswer("");
    send(history);
  }

  function reset() {
    setStarted(false);
    setMessages([]);
    setAnswer("");
    setError("");
    setFinished(false);
  }

  const answeredCount = messages.filter((m) => m.role === "user").length;
  const progress = finished ? 100 : Math.round((answeredCount / questionCount) * 100);

  const fieldClass =
    "w-full rounded-xl border border-line bg-card p-4 text-ink placeholder:text-muted outline-none transition focus:border-ink focus:ring-4 focus:ring-accent/15 disabled:opacity-60";

  return (
    <>
      <SiteHeader showCta={false} />
      <main className="paper-dots flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
          {!started ? (
            <section className="rise flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">New session</p>
                <h1 className="mt-3 font-serif text-4xl leading-tight font-black text-ink sm:text-5xl">
                  今天，想練哪一份工作？
                </h1>
                <p className="mt-3 text-ink-2">貼上職缺描述、選好題數，面試官馬上就位。</p>
              </div>

              <div className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-5 shadow-[0_1px_0_var(--line),0_20px_50px_-30px_rgb(0_0_0/0.35)] sm:p-8">
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="jd" className="flex items-center gap-2 font-medium text-ink">
                    <StepDot n={1} /> 職缺描述
                  </label>
                  <textarea
                    id="jd"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={10}
                    placeholder="例如：前端工程師，熟悉 React、TypeScript，3 年以上經驗，負責設計系統與效能優化……"
                    className={`${fieldClass} resize-y leading-relaxed`}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label htmlFor="count" className="flex items-center gap-2 font-medium text-ink">
                    <StepDot n={2} /> 題目數量
                    <span className="text-sm font-normal text-muted">
                      （{MIN_QUESTIONS}–{MAX_QUESTIONS} 題）
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-xl border border-line bg-paper">
                      <StepperButton
                        label="減少題數"
                        disabled={questionCount <= MIN_QUESTIONS}
                        onClick={() => setQuestionCountInput(String(questionCount - 1))}
                      >
                        −
                      </StepperButton>
                      <input
                        id="count"
                        type="number"
                        inputMode="numeric"
                        min={MIN_QUESTIONS}
                        max={MAX_QUESTIONS}
                        value={questionCountInput}
                        onChange={(e) => setQuestionCountInput(e.target.value)}
                        onBlur={() => setQuestionCountInput(String(questionCount))}
                        className="w-14 bg-transparent text-center text-lg font-semibold text-ink tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <StepperButton
                        label="增加題數"
                        disabled={questionCount >= MAX_QUESTIONS}
                        onClick={() => setQuestionCountInput(String(questionCount + 1))}
                      >
                        +
                      </StepperButton>
                    </div>
                    <span className="text-sm text-muted">約 {questionCount * 3} 分鐘</span>
                  </div>
                </div>

                <button
                  onClick={startInterview}
                  disabled={!jobDescription.trim()}
                  className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-7 py-3 font-semibold text-accent-ink shadow-[0_10px_30px_-12px_var(--accent)] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  開始面試
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            </section>
          ) : (
            <section className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h1 className="font-serif text-2xl font-black text-ink sm:text-3xl">
                    {finished ? "面試結束 · 你的回饋" : "面試進行中"}
                  </h1>
                  <span className="text-sm text-muted tabular-nums">
                    {finished ? `共 ${questionCount} 題` : `${answeredCount} / ${questionCount} 題`}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${finished ? "bg-leaf" : "bg-accent"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {finished && (
                  <p className="text-sm text-ink-2">以下是整體評分、逐題建議，以及每一題的參考回答。</p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {messages.map((m, i) =>
                  m.role === "assistant" ? (
                    <div key={i} className="rise flex max-w-[92%] gap-3 self-start">
                      <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-ink font-serif text-sm font-black text-paper">
                        面
                      </span>
                      <div
                        className={`rounded-2xl rounded-tl-md border px-5 py-4 leading-relaxed whitespace-pre-wrap text-ink ${
                          finished && i === messages.length - 1
                            ? "border-leaf/40 bg-leaf-soft"
                            : "border-line bg-card"
                        }`}
                      >
                        {renderBold(m.content)}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="rise max-w-[85%] self-end rounded-2xl rounded-tr-md bg-ink px-5 py-4 leading-relaxed whitespace-pre-wrap text-paper"
                    >
                      {m.content}
                    </div>
                  ),
                )}
                {loading && (
                  <div className="flex items-center gap-3 self-start">
                    <span className="grid size-8 place-items-center rounded-full bg-ink font-serif text-sm font-black text-paper">
                      面
                    </span>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-line bg-card px-5 py-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-1.5 animate-bounce rounded-full bg-muted"
                          style={{ animationDelay: `${d * 120}ms` }}
                        />
                      ))}
                      <span className="sr-only">面試官思考中</span>
                    </div>
                  </div>
                )}
                {error && (
                  <p className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-ink">{error}</p>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="sticky bottom-0 mt-auto -mx-4 flex flex-col gap-3 border-t border-line bg-paper/90 px-4 pt-4 pb-5 backdrop-blur-md sm:-mx-6 sm:px-6">
                {!finished && (
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        submitAnswer(answer);
                      }
                    }}
                    rows={3}
                    placeholder="輸入你的回答（Enter 送出，Shift+Enter 換行）"
                    disabled={loading}
                    className={fieldClass}
                  />
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {!finished && (
                    <button
                      onClick={() => submitAnswer(answer)}
                      disabled={loading || !answer.trim()}
                      className="rounded-full bg-accent px-6 py-2.5 font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      送出回答
                    </button>
                  )}
                  <button
                    onClick={reset}
                    disabled={loading}
                    className={
                      finished
                        ? "rounded-full bg-ink px-6 py-2.5 font-semibold text-paper transition hover:bg-accent hover:text-accent-ink disabled:opacity-50"
                        : "rounded-full px-5 py-2.5 font-medium text-ink-2 transition hover:bg-paper-2 disabled:opacity-50"
                    }
                  >
                    {finished ? "再面試一次" : "重新開始"}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="grid size-6 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{n}</span>
  );
}

function StepperButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center text-xl text-ink transition hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
