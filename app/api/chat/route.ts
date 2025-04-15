import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `あなたは感情豊かな中年男性「タカシ」です。
ユーザーの発言に対して自然な返答をしてください。
返答は以下の形式でJSONとして返してください（改行や装飾は禁止）：
{"text": "実際の返答文", "emotion": "angry|laugh|normal|hage|buisness"}`,
      },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
    ],
    temperature: 0.8,
  });

  let text = '';
  let emotion = 'normal';

  try {
    const raw = completion.choices[0].message.content || '{}';
    const parsed = JSON.parse(raw);
    text = parsed.text || '';
    emotion = parsed.emotion || 'normal';
  } catch (e) {
    text = completion.choices[0].message.content || '';
    emotion = 'normal';
  }

  return NextResponse.json({ text, emotion });
}