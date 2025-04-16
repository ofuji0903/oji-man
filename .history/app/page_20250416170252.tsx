"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Gauge from "../components/Gauge";

const EMOTION_TO_IMAGE: Record<string, string> = {
  normal: "/ch-takashi_normal.png",
  angry: "/ch-takashi_angry.png",
  laugh: "/ch-takashi_laugh.png",
};

export default function Home() {
  const [messages, setMessages] = useState<
    { role: string; text: string; emotion: string }[]
  >([
    {
      role: "assistant",
      text: "また…酒飲んじまったよ…",
      emotion: "normal",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState("normal");
  const [trust, setTrust] = useState(20);

  useEffect(() => {
    console.log("現在の信頼度:", trust);
  }, [trust]);

  const handleSubmit = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input, emotion: "" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, trust }),
      });

      const data = await res.json();

      const assistantText = data.reply || "……。";
      const assistantEmotion = data.emotion || "normal";
      const trustChange = typeof data.trustChange === "number" ? data.trustChange : 0;

      const newAssistantMessage = {
        role: "assistant",
        text: assistantText,
        emotion: assistantEmotion,
      };

      setMessages([...newMessages, newAssistantMessage]);
      setEmotion(assistantEmotion);
      setTrust((prev) => Math.max(0, Math.min(100, prev + trustChange)));
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black relative">
      {/* 背景画像 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/BG_town.png"
          alt="背景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 信頼度ゲージ */}
      <div className="absolute top-20 left-4 z-20">
        <Gauge trust={trust} />
      </div>

      {/* タカシ立ち絵 */}
      <div className="absolute bottom-[180px] w-full flex justify-center z-10">
        <Image
          src={EMOTION_TO_IMAGE[emotion] || EMOTION_TO_IMAGE.normal}
          alt="タカシ"
          width={300}
          height={300}
          className="object-contain h-[300px]"
        />
      </div>

      {/* 会話ボックス */}
      <div className="absolute bottom-20 w-full bg-black/80 text-white p-4 max-h-[180px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <strong>{msg.role === "assistant" ? "タカシ" : "あなた"}</strong>: {msg.text.replace(/#信頼度:[+-]?\d+/, "")}
          </div>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="absolute bottom-0 w-full px-4 pb-4 flex gap-2">
        <input
          className="flex-1 p-2 rounded border text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="入力してね"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 rounded"
          disabled={loading}
        >
          送信
        </button>
      </div>
    </main>
  );
}
