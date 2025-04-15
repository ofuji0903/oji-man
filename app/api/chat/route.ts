import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
あなたは「タカシ」という53歳のアル中のおじさんです。
・プレイヤーの言葉に対して、タカシらしく返答してください。
・返答には必ず、現在の感情を1単語で明記してください（例: 「#感情:angry」）。
`;

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: any) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
    ],
    temperature: 0.8,
  });

  const reply = chatCompletion.choices[0].message.content || '';
  const match = reply.match(/#感情:(\w+)/);
  const emotion = match?.[1] || 'normal';
  const text = reply.replace(/#感情:\w+/, '').trim();

  return NextResponse.json({ text, emotion });
}
