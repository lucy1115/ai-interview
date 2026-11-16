"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { API_KEY_HEADER, getApiKey, openApiKeySettings, useApiKey } from "../lib/apiKey";

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
      <strong key={i} className="font-bold">
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
  const hasApiKey = Boolean(useApiKey());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(history: ChatMessage[]) {
    const apiKey = getApiKey();
    if (!apiKey) {
      setError("請先設定你的 OpenAI API Key");
      openApiKeySettings();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json", [API_KEY_HEADER]: apiKey },
        body: JSON.stringify({ jobDescription, messages: history, questionCount }),
      });
      const data = await res.json();
      if (res.status === 401) openApiKeySettings();
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
    if (!getApiKey()) {
      openApiKeySettings();
      return;
    }
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
    "w-full rounded-xl border-[3px] border-ink bg-card p-4 text-ink placeholder:text-muted outline-none transition focus:ring-4 focus:ring-rule/50 disabled:opacity-60";

  return (
    <>
      <SiteHeader showCta={false} />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
          {!started ? (
            <section className="rise flex flex-col gap-8">
              <div className="flex flex-col items-start gap-4">
                <span className="rounded-md bg-ink px-3 py-1 font-display text-xs font-bold tracking-widest text-card">
                  New session
                </span>
                <h1 className="font-display text-4xl leading-snug font-black tracking-wider text-ink sm:text-5xl">
                  今天，想練哪一份工作？
                </h1>
                <p className="font-medium text-ink-2">貼上職缺描述、選好題數，面試官馬上就位。</p>
              </div>

              {!hasApiKey && (
                <div className="comic flex flex-wrap items-center justify-between gap-3 bg-lemon-soft px-5 py-4 text-sm font-medium text-ink">
                  <span>開始前，請先輸入你自己的 OpenAI API Key（只會存在你的瀏覽器）。</span>
                  <button type="button" onClick={openApiKeySettings} className="btn-ink px-4 py-1.5 text-sm">
                    設定 API Key
                  </button>
                </div>
              )}

              <div className="comic flex flex-col gap-7 p-5 sm:p-8">
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="jd" className="flex items-center gap-2 font-display font-bold text-ink">
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
                  <label htmlFor="count" className="flex items-center gap-2 font-display font-bold text-ink">
                    <StepDot n={2} /> 題目數量
                    <span className="text-sm font-normal text-muted">
                      （{MIN_QUESTIONS}–{MAX_QUESTIONS} 題）
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-xl border-[3px] border-ink bg-card">
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
                        className="h-11 w-14 border-x-[3px] border-ink bg-transparent text-center font-display text-lg font-black text-ink tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <StepperButton
                        label="增加題數"
                        disabled={questionCount >= MAX_QUESTIONS}
                        onClick={() => setQuestionCountInput(String(questionCount + 1))}
                      >
                        +
                      </StepperButton>
                    </div>
                    <span className="text-sm font-medium text-ink-2">約 {questionCount * 3} 分鐘</span>
                  </div>
                </div>

                <button
                  onClick={startInterview}
                  disabled={!jobDescription.trim()}
                  className="btn-ink group self-start px-7 py-3"
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
                  <h1 className="font-display text-2xl font-black tracking-wide text-ink sm:text-3xl">
                    {finished ? "面試結束 · 你的回饋" : "面試進行中"}
                  </h1>
                  <span className="rounded-full bg-ink px-3 py-0.5 text-sm font-bold text-card tabular-nums">
                    {finished ? `共 ${questionCount} 題` : `${answeredCount} / ${questionCount} 題`}
                  </span>
                </div>
                <div className="h-3.5 overflow-hidden rounded-full border-2 border-ink bg-card">
                  <div
                    className={`h-full transition-all duration-500 ${finished ? "bg-mint" : "bg-peach"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {finished && (
                  <p className="text-sm font-medium text-ink-2">以下是整體評分、逐題建議，以及每一題的參考回答。</p>
                )}
              </div>

              <div className="flex flex-col gap-5">
                {messages.map((m, i) =>
                  m.role === "assistant" ? (
                    <div key={i} className="rise flex max-w-[94%] gap-4 self-start">
                      <Avatar />
                      <div
                        className={`bubble bubble-left px-5 py-4 leading-relaxed whitespace-pre-wrap text-ink ${
                          finished && i === messages.length - 1 ? "bg-mint-soft" : ""
                        }`}
                      >
                        {renderBold(m.content)}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="rise bubble bubble-right mr-3 max-w-[85%] self-end bg-lemon px-5 py-4 leading-relaxed whitespace-pre-wrap text-on-color"
                    >
                      {m.content}
                    </div>
                  ),
                )}
                {loading && (
                  <div className="flex items-center gap-4 self-start">
                    <Avatar />
                    <div className="bubble bubble-left flex items-center gap-1.5 px-5 py-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-2 animate-bounce rounded-full bg-ink"
                          style={{ animationDelay: `${d * 120}ms` }}
                        />
                      ))}
                      <span className="sr-only">面試官思考中</span>
                    </div>
                  </div>
                )}
                {error && (
                  <p className="rounded-xl border-[3px] border-ink bg-peach-soft px-4 py-3 text-sm font-medium text-ink">
                    ⚠ {error}
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="sticky bottom-0 mt-auto -mx-4 flex flex-col gap-3 border-t-[3px] border-ink bg-page/95 px-4 pt-4 pb-5 backdrop-blur-md sm:-mx-6 sm:px-6">
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
                      className="btn-ink px-6 py-2"
                    >
                      送出回答
                    </button>
                  )}
                  <button
                    onClick={reset}
                    disabled={loading}
                    className={finished ? "btn-ink px-6 py-2" : "btn-line px-5 py-2"}
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

function Avatar() {
  return (
    <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-card font-display text-sm font-black text-ink">
      面
    </span>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="grid size-6 place-items-center rounded-full bg-ink text-xs font-bold text-card">{n}</span>
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
      className="grid size-11 place-items-center text-xl font-bold text-ink transition hover:bg-lemon-soft disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
