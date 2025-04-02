import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Head from "next/head";

export default function ChatRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const username = typeof window !== "undefined"
    ? localStorage.getItem("username") || "익명"
    : "익명";

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "chats", String(roomId), "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "chats", String(roomId), "messages"), {
      sender: username,
      text: newMessage.trim(),
      timestamp: Timestamp.now(),
    });

    setNewMessage("");
  };

  return (
    <>
      <Head>
        <title>채팅방 - {roomId}</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col h-[80vh]">
          <header className="px-6 py-4 border-b border-gray-200 text-lg font-semibold text-blue-600">
            채팅방: {roomId}
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs rounded-xl px-4 py-2 text-sm shadow
                  ${msg.sender === username
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-gray-100 text-gray-800"}`}
              >
                <div className="font-semibold mb-1">{msg.sender}</div>
                <div>{msg.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full transition"
            >
              보내기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}