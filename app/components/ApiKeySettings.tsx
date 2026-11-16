"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_SETTINGS_EVENT, clearApiKey, maskApiKey, setApiKey, useApiKey } from "../lib/apiKey";

export function ApiKeySettings() {
  const apiKey = useApiKey();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState("");
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  function open() {
    setDraft("");
    setShow(false);
    setSaved(false);
    dialogRef.current?.showModal();
  }

  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setApiKey(draft);
    setDraft("");
    setSaved(true);
  }

  const hasKey = Boolean(apiKey);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-card px-3 py-1 text-sm font-bold text-ink transition hover:bg-lemon-soft"
        aria-label="API Key 設定"
      >
        <span aria-hidden className={`size-2.5 rounded-full border-2 border-ink ${hasKey ? "bg-mint" : "bg-peach"}`} />
        <span className="hidden sm:inline">{hasKey ? "API Key 已設定" : "設定 API Key"}</span>
        <svg viewBox="0 0 24 24" className="size-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l9-9M17 6l3 3M15 8l2 2" strokeLinecap="round" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="comic m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden p-0 text-ink backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={save} className="flex flex-col">
          <div className="halftone border-b-[3px] border-ink px-6 py-5 sm:px-7">
            <h2 className="font-display text-2xl font-black tracking-wide">OpenAI API Key</h2>
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-ink-2">
              本服務採用自備金鑰（BYOK）模式。你的 API Key 只會儲存在這個瀏覽器的 localStorage，
              每次面試時隨請求送出，伺服器不會保存。
            </p>

            <div className="rounded-xl border-2 border-dashed border-ink/40 px-4 py-3 text-sm">
              目前狀態：
              {hasKey ? (
                <span className="font-mono font-bold">{maskApiKey(apiKey)}</span>
              ) : (
                <span className="font-bold text-alert">尚未設定</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="api-key" className="font-display text-sm font-bold">
                {hasKey ? "更換 API Key" : "輸入 API Key"}
              </label>
              <div className="flex items-center gap-2 rounded-xl border-[3px] border-ink bg-card px-3 focus-within:ring-4 focus-within:ring-rule/50">
                <input
                  id="api-key"
                  type={show ? "text" : "password"}
                  autoComplete="off"
                  spellCheck={false}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    setSaved(false);
                  }}
                  placeholder="sk-..."
                  className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-sm outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="shrink-0 text-xs font-bold text-ink-2 hover:text-ink"
                >
                  {show ? "隱藏" : "顯示"}
                </button>
              </div>
              <p className="text-xs text-ink-2">
                可在{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline"
                >
                  platform.openai.com/api-keys
                </a>{" "}
                建立金鑰。費用會計入你自己的 OpenAI 帳戶。
              </p>
            </div>

            {saved && <p className="text-sm font-bold text-mint">已儲存 ✓</p>}

            <div className="flex flex-wrap items-center justify-between gap-2">
              {hasKey ? (
                <button
                  type="button"
                  onClick={() => {
                    clearApiKey();
                    setSaved(false);
                  }}
                  className="text-sm font-bold text-alert underline-offset-4 hover:underline"
                >
                  清除金鑰
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <button type="button" onClick={() => dialogRef.current?.close()} className="btn-line px-4 py-1.5 text-sm">
                  關閉
                </button>
                <button type="submit" disabled={!draft.trim()} className="btn-ink px-5 py-1.5 text-sm">
                  儲存
                </button>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
