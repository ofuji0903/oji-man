"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Gauge from "../components/Gauge";

const EMOTION_TO_IMAGE: Record<string, string> = {
  normal: "/ch-takashi_normal.png",
  angry: "/ch-takashi_angry.png",
  laugh: "/ch-takashi_laugh.png",
  hage: "/ch-takashi_hage.png",
  buisness: "/ch-takashi_buisness.png",
};

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [emotion, setEmotion] = useState("normal");
  const [trust, setTrust] = useState(20);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
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
      console.log("APIレスポンス:", data); //コンソールにAPI回答をログ出力
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "takashi", text: data.reply }]);
        if (data.emotion && EMOTION_TO_IMAGE[data.emotion]) {
          setEmotion(data.emotion);
        }
        if (typeof data.trustChange === "number") {
          setTrust((prev) => Math.max(0, Math.min(100, prev + data.trustChange)));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 背景画像 */}
      <Image
        src="/BG_town.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* 信頼度ゲージ */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 z-20 sm:left-4">
        <Gauge trust={trust} />
      </div>

      {/* タカシ立ち絵 */}
      <div className="absolute bottom-[240px] w-full flex justify-center z-10">
        {EMOTION_TO_IMAGE[emotion] && (
          <Image
            src={EMOTION_TO_IMAGE[emotion]}
            alt="タカシ"
            width={300}
            height={300}
            className="w-[220px] sm:w-[300px] h-auto"
          />
        )}
      </div>

      {/* 会話ウィンドウ */}
      <div className="absolute bottom-[70px] left-1/2 transform -translate-x-1/2 w-full max-w-full sm:max-w-4xl px-4 sm:px-8 z-20">
        <div className="bg-black bg-opacity-60 p-4 rounded-lg h-32 overflow-y-auto text-sm sm:text-base">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <strong className="mr-2">{msg.role === "user" ? "あなた" : "タカシ"}:</strong>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="入力してね"
            className="flex-grow p-2 rounded-md text-black text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded-md text-white disabled:opacity-50"
            disabled={loading}
          >
            送信
          </button>
        </form>
      </div>
    </main>
  );
}