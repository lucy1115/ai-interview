type ChatMessage = { role: "user" | "assistant"; content: string };

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 10;
const DEFAULT_QUESTIONS = 3;

function parseQuestionCount(value: unknown) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return DEFAULT_QUESTIONS;
  return Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, n));
}

function buildSystemPrompt(jobDescription: string, totalQuestions: number) {
  return `你是一位專業、友善但嚴謹的面試官，正在依照以下職缺描述進行模擬面試。

【職缺描述】
${jobDescription}

面試規則：
1. 全程使用繁體中文。
2. 整場面試只問 ${totalQuestions} 題，一次只問一題，不要追問。題目要和職缺描述相關，盡量涵蓋技術能力、過往經驗與行為面向。
3. 使用者回答後，用一兩句簡短回應，再提出下一題，並標示題號（例如「第 2 題：」）。
4. 第一次發言時，先簡短自我介紹，再提出第 1 題。
5. 使用者回答完第 ${totalQuestions} 題後，不要再出題，改為提供面試評分與建議：
   - 整體評分（1-10 分）
   - 逐題回饋：每一題都要列出
     ・題目
     ・評分（1-10 分）
     ・這次回答的優缺點與具體建議
     ・建議的回答方式：說明這題比較好的回答架構（例如 STAR 法則：情境、任務、行動、結果），並根據職缺描述與使用者的回答，寫出一段可以直接參考的示範回答
   - 整體優點
   - 需要改進的地方`;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "伺服器未設定 OPENAI_API_KEY" }, { status: 500 });
  }

  let body: { jobDescription?: unknown; messages?: unknown; questionCount?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "請求格式錯誤" }, { status: 400 });
  }

  const jobDescription = typeof body.jobDescription === "string" ? body.jobDescription.trim() : "";
  if (!jobDescription) {
    return Response.json({ error: "請提供職缺描述" }, { status: 400 });
  }

  const totalQuestions = parseQuestionCount(body.questionCount);

  const messages: ChatMessage[] = Array.isArray(body.messages)
    ? body.messages.filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
    : [];

  const answeredCount = messages.filter((m) => m.role === "user").length;
  const finished = answeredCount >= totalQuestions;

  const conversation: { role: "system" | "user" | "assistant"; content: string }[] =
    messages.length ? [...messages] : [{ role: "user", content: "我準備好了，請開始面試。" }];
  if (finished) {
    conversation.push({
      role: "system",
      content: `使用者已經回答完 ${totalQuestions} 題，面試結束。請不要再出題，直接給出評分、逐題建議與每題的建議回答方式（含示範回答）。`,
    });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt(jobDescription, totalQuestions) },
        ...conversation,
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("OpenAI API error:", res.status, detail);
    return Response.json({ error: `OpenAI API 錯誤（${res.status}）` }, { status: 502 });
  }

  const data = await res.json();
  const reply: string = data.choices?.[0]?.message?.content ?? "";
  return Response.json({ reply, finished });
}
