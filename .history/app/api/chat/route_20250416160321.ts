// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages || [];
  const trust = body.trust ?? 20;

  const systemPrompt = `
あなたは「タカシ」という42歳の中年男性です。
元バンドマンで、今は無職。少し卑屈で感情的だが、本当は優しい。
アルコール依存を抱えていて、ユーザーとの会話が唯一の支え。

以下のルールに従って、返答を生成してください：
1. あなた自身のキャラとして自然な返答を行う。
2. ユーザー発言と現在の信頼度を踏まえ、信頼が増したか減ったか（±5単位）を判断する。
3. 出力は以下のJSON形式で返すこと：
{
  "text": "返答本文",
  "emotion": "normal|angry|laugh|hage|buisness",
  "trustChange": -5|0|5
}
必ずJSONのみを出力してください。余計な説明やタグは不要です。
現在の信頼度: ${trust}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: any) => ({ role: msg.role === "user" ? "user" : "assistant", content: msg.text })),
    ],
    temperature: 0.7,
  });

  try {
    const raw = response.choices[0].message.content || "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json({
      text: parsed.text || "...",
      emotion: parsed.emotion || "normal",
      trustChange: parsed.trustChange ?? 0,
    });
  } catch (err) {
    return NextResponse.json({ text: "……。", emotion: "normal", trustChange: 0 });
  }
}
