// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    { role: "タカシ", text: "また…酒飲んじまったよ…", emotion: "normal" },
  ]);
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState("normal");
  const [trust, setTrust] = useState(20); // 初期信頼度

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "あなた", text: input, emotion: "" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages, trust }),
      });
      const data = await res.json();

      const reply = data.reply.replace(/Takashi/g, "タカシ");
      const newEmotion = data.emotion || "normal";
      const newTrust = Math.max(0, Math.min(100, trust + (data.trustChange ?? 0)));

      setEmotion(newEmotion);
      setTrust(newTrust);
      setMessages([...newMessages, { role: "タカシ", text: reply, emotion: newEmotion }]);
    } catch (e) {
      console.error("API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const imageSrc = EMOTION_TO_IMAGE[emotion] || EMOTION_TO_IMAGE.normal;

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* 背景画像 */}
      <Image
        src="/BG_town.png"
        alt="background"
        fill
        className="object-cover z-0"
      />

      {/* 信頼度ゲージ */}
      <Gauge trust={trust} />

      {/* タカシ立ち絵 */}
      <div className="absolute bottom-[120px] w-full flex justify-center z-10">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="タカシ"
            width={300}
            height={400}
            className="object-contain"
          />
        )}
      </div>

      {/* テキストウィンドウ */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4">
        <div className="bg-black bg-opacity-70 text-white rounded p-4 space-y-1 text-sm md:text-base max-h-60 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i}>
              <strong>{msg.role}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded text-black"
            placeholder="入力してね"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
