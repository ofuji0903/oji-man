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
  const [messages, setMessages] = useState<any[]>([]);
  const [emotion, setEmotion] = useState("normal");
  const [trust, setTrust] = useState(20);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage], trust }),
    });

    const data = await res.json();
    const { text, emotion, trustChange } = data;

    setMessages((prev) => [...prev, { role: "takashi", text, emotion }]);
    setEmotion(emotion);
    setTrust((prev) => Math.min(100, Math.max(0, prev + (trustChange || 0))));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/BG_street.png')] flex flex-col justify-between p-4">
      <div className="relative flex justify-center items-center">
        <Gauge trust={trust} />
        <img src={EMOTION_TO_IMAGE[emotion]} alt="タカシ" className="h-80 object-contain mx-8" />
      </div>

      <div className="bg-black bg-opacity-70 text-white p-4 rounded-md max-w-screen-sm mx-auto w-full">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.role === "user" ? "You" : "Takashi"}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4 max-w-screen-sm mx-auto w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-md text-black"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          送信
        </button>
      </form>
    </div>
  );
}
