"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Gauge from "../components/Gauge";

const EMOTION_TO_IMAGE: Record<string, string> = {
  normal: "/ch-takashi_normal.png",
  angry: "/ch-takashi_angry.png",
  laugh: "/ch-takashi_laugh.png",
  hage: "/ch-takashi_hage.png",
  buisness: "/ch-takashi_buisness.png",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "また…酒飲んじまったよ…", emotion: "normal" },
  ]);
  const [loading, setLoading] = useState(false);
  const [trust, setTrust] = useState(20);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", text: input, emotion: "normal" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    if (!data?.result?.role || !data?.result?.text) {
      console.warn("信頼度変化取得エラー：assistantMessageが見つかりません");
      setMessages(newMessages);
      setLoading(false);
      return;
    }

    const updatedMessages = [...newMessages, data.result];
    const match = data.result.text.match(/#信頼度:\s?([+-]?\d+)/);
    const change = match ? parseInt(match[1]) : 0;
    const nextTrust = Math.max(0, Math.min(100, trust + change));
    setTrust(nextTrust);
    setMessages(updatedMessages);
    setLoading(false);
  };

  const emotion = messages[messages.length - 1]?.emotion || "normal";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-black">
      {/* 背景画像 */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/BG_town.png"
          alt="背景"
          fill
          className="object-cover"
        />
      </div>

      {/* 信頼度ゲージ */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 z-20">
        <Gauge trust={trust} />
      </div>

      {/* タカシ立ち絵 */}
      <div className="absolute bottom-[160px] w-full flex justify-center z-10">
        <Image
          src={EMOTION_TO_IMAGE[emotion] || EMOTION_TO_IMAGE.normal}
          alt="タカシ"
          width={300}
          height={400}
        />
      </div>

      {/* 会話ログ＆入力欄 */}
      <div className="absolute bottom-0 w-full z-20">
        <div
          ref={scrollRef}
          className="max-h-40 overflow-y-auto px-4 pb-2 text-white bg-black/80"
        >
          {messages.map((m, i) => (
            <div key={i} className="whitespace-pre-wrap">
              <strong>{m.role === "user" ? "あなた" : "タカシ"}</strong>: {m.text.replace(/#信頼度:[+-]?\d+/, "")}
            </div>
          ))}
        </div>
        <div className="flex bg-white p-2">
          <input
            className="flex-1 border border-gray-300 rounded px-2"
            type="text"
            placeholder="入力してね"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={loading}
          />
          <button
            className="bg-green-600 text-white px-4 py-1 rounded ml-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            送信
          </button>
        </div>
      </div>
    </main>
  );
}