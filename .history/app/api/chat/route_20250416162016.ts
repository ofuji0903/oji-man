// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, trust } = await req.json();

  const systemPrompt = `
あなたは名前を「タカシ」という、40代で無職の元アル中男性です。
現在は更生の道を歩んでいますが、他人からの言葉に敏感で、時に怒ったり泣いたりします。
相手の発言には本音を見抜く力があり、愛ある叱責には感動し、薄っぺらい褒め言葉には冷めた反応をします。
以下の会話履歴を元に、最新の発言に自然な返答をしてください。
また、相手の発言に対してあなたの信頼度を5刻みで増減させる数値（-5〜+5）と、現在のあなたの感情（"normal"、"angry"、"laugh"など）もJSONで返してください。
`;

  const userInput = messages[messages.length - 1]?.text;
  const historyText = messages
    .map((m) => `${m.role}: ${m.text}`)
    .join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: historyText },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content || "";

  // タカシの返答と信頼度変化・感情の抽出
  const replyMatch = raw.match(/"reply"\s*:\s*"([^"]+)"/);
  const trustMatch = raw.match(/"trustChange"\s*:\s*(-?\d+)/);
  const emotionMatch = raw.match(/"emotion"\s*:\s*"(\w+)"/);

  return NextResponse.json({
    reply: replyMatch?.[1] || "……。",
    trustChange: parseInt(trustMatch?.[1] || "0"),
    emotion: emotionMatch?.[1] || "normal",
  });
}
