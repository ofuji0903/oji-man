// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, trust } = await req.json();

  const systemPrompt = `
あなたは「タカシ」という名前の中年男性で、かつてアルコール依存症でしたが、今は更生を目指しています。
以下の会話履歴と現在の信頼度（数値: ${trust}）を踏まえて、感情のこもったリアルな返答を生成してください。
ユーザーの言動に対して、怒る・落ち込む・励まされるなどの感情変化を自然に反映してください。
信頼度が低いうちは怒りっぽく卑屈な回答。信頼度が高くなると褒め言葉も素直に受け取ってください。
また、返答ごとに「信頼度を +5 / 0 / -5」どれかで変化させてください。
出力は以下のJSON形式でしてください：
{
  "reply": "タカシの返答",
  "emotion": "normal | angry | laugh | hage | buisness",
  "trustChange": 5 or 0 or -5
}`;

  const userMessages = messages.map((msg: any) => `${msg.role}：${msg.text}`).join("\n");

  const prompt = `${systemPrompt}\n\n会話履歴：\n${userMessages}`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4", // もしくは gpt-4-turbo 等コスト抑制モデル
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
  });

  const response = chat.choices[0].message.content;

  try {
    const parsed = JSON.parse(response || "{}");
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("JSON parse error:", e);
    return NextResponse.json({ reply: "……。", emotion: "normal", trustChange: 0 });
  }
}
