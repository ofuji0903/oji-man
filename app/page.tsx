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
    const newMessages = [...messages, { role: 'user', text: input }];
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

  const currentEmotion = messages.findLast((m) => m.role === 'takashi')?.emotion || 'normal';

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/BG_town.png')" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <img src={EMOTION_TO_IMAGE[currentEmotion]} className="h-96 object-contain" alt="たかし" />
        </div>

        <div className="bg-green-800 text-white p-4 rounded mb-4 min-h-[120px]">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <span className="block">{m.role === 'user' ? 'あなた' : 'タカシ'}：{m.text}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border border-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="入力してね"
          />
          <button
            onClick={handleSend}
            className="bg-green-700 text-white px-4 py-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '送信中…' : '送信'}
          </button>
        </div>
      </div>
    </div>
  );
}
