"use client";

import { useSyncExternalStore } from "react";

// BYOK：使用者自己的 OpenAI API Key 只存在瀏覽器的 localStorage，
// 每次呼叫我們的 API 時透過 header 帶上，伺服器不會儲存。
const STORAGE_KEY = "openai_api_key";
const CHANGE_EVENT = "openai-api-key-change";

export const API_KEY_HEADER = "X-OpenAI-Key";

export function getApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setApiKey(key: string) {
  try {
    const trimmed = key.trim();
    if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage 不可用（例如無痕模式被封鎖）時忽略
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearApiKey() {
  setApiKey("");
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback); // 其他分頁修改時同步
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** 讀取目前儲存的 API Key，設定變更時會自動更新 */
export function useApiKey() {
  return useSyncExternalStore(subscribe, getApiKey, () => "");
}

/** 開啟設定視窗（任何元件都可以呼叫） */
export const OPEN_SETTINGS_EVENT = "open-api-key-settings";
export function openApiKeySettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function maskApiKey(key: string) {
  if (key.length <= 10) return "••••••";
  return `${key.slice(0, 5)}••••${key.slice(-4)}`;
}
