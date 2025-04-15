"use client";

import { useState } from 'react';

const EMOTION_TO_IMAGE = {
  normal: '/ch-takashi_normal.png',
  angry: '/ch-takashi_angry.png',
  laugh: '/ch-takashi_laugh.png',
  hage: '/ch-takashi_hage.png',
  buisness: '/ch-takashi_buisness.png',
};

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'takashi', text: 'また…酒飲んじまったよ…', emotion: 'normal' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: 'user', text: input, emotion: 'normal' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'takashi', text: data.text, emotion: data.emotion }]);
    setLoading(false);
  };

  const fallbackImage = '/ch-takashi_normal.png';
  const currentEmotion = messages.findLast((m) => m.role === 'takashi')?.emotion || 'normal';
  const currentImage = EMOTION_TO_IMAGE[currentEmotion] || fallbackImage;

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/BG_town.png')", backgroundSize: '100% 100%' }}
    >
      <div className="flex flex-col h-full max-w-4xl mx-auto px-4 py-4">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={currentImage}
            className="max-h-[60vh] object-contain mx-auto"
            alt="たかし"
          />
        </div>

        <div className="bg-black bg-opacity-70 text-white p-4 rounded mb-4 min-h-[100px] max-h-[25vh] overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <span className="block whitespace-pre-wrap text-sm">
                {m.role === 'user' ? 'あなた' : 'タカシ'}：{m.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border border-gray-400 rounded bg-white text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="入力してね"
          />
          <button
            onClick={handleSend}
            className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '送信中…' : '送信'}
          </button>
        </div>
      </div>
    </div>
    


    
  );
}
