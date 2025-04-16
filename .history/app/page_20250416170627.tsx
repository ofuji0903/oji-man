"use client";

import { useEffect, useState } from "react";
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
    {
      role: "assistant",
      text: "また…酒飲んじまったよ…",
      emotion: "normal",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState("normal");
  const [trust, setTrust] = useState(20);

  const handleSubmit = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      console.log("API response:", data);

      const assistantMessage = {
        role: "assistant",
        text: data.reply || "……。",
        emotion: data.emotion || "normal",
      };
      const trustChange = data.trustChange || 0;

      setMessages((prev) => [...prev, assistantMessage]);
      setEmotion(data.emotion || "normal");
      setTrust((prev) => Math.max(0, Math.min(100, prev + trustChange)));
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/BG_town.png"
          alt="背景"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 信頼度ゲージ */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
        <Gauge value={trust} />
      </div>

      {/* タカシ立ち絵 */}
      <div className="absolute bottom-64 w-full flex justify-center z-10">
        <Image
          src={EMOTION_TO_IMAGE[emotion] || EMOTION_TO_IMAGE.normal}
          alt="タカシ"
          width={300}
          height={300}
        />
      </div>

      {/* テキストログ */}
      <div className="absolute bottom-20 w-full px-4 z-20">
        <div className="max-w-4xl mx-auto bg-black/80 text-white p-4 rounded overflow-y-auto h-40">
          {messages.map((m, i) => (
            <div key={i} className="mb-2">
              <strong>{m.role === "user" ? "あなた" : "タカシ"}</strong>: {m.text}
            </div>
          ))}
        </div>
      </div>

      {/* 入力欄 */}
      <div className="absolute bottom-4 w-full px-4 z-20">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 p-2 rounded border"
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
    </main>
  );
}
