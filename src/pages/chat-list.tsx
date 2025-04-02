import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function ChatList() {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      const snapshot = await getDocs(collection(db, "chats"));
      const chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChatRooms(chats);
    };
    fetchChats();
  }, []);

  const enterRoom = (roomId: string) => {
    router.push(`/chat/${encodeURIComponent(roomId)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>채팅방 목록 - 혼밥 메이트</title>
      </Head>

      <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-600">🍽 혼밥 메이트</h1>
        <nav className="space-x-4 text-sm">
          <button onClick={() => router.push("/")} className="text-gray-600 hover:text-blue-600">홈</button>
          <button onClick={() => router.push("/match")} className="text-gray-600 hover:text-blue-600">매칭</button>
          <button onClick={() => router.push("/chat-list")} className="text-gray-600 hover:text-blue-600">채팅방</button>
          <button onClick={() => router.push("/login")} className="text-gray-600 hover:text-blue-600">로그인</button>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-600">로그아웃</button>
        </nav>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            참여 가능한 채팅방
          </h2>

          {chatRooms.length === 0 ? (
            <p className="text-center text-gray-500">아직 생성된 채팅방이 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {chatRooms.map((room) => (
                <li
                  key={room.id}
                  className="bg-blue-50 hover:bg-blue-100 transition cursor-pointer rounded-lg px-4 py-3 border border-blue-200 shadow"
                  onClick={() => enterRoom(room.roomId)}
                >
                  <div className="text-gray-800 font-medium">{room.roomId}</div>
                  <div className="text-sm text-gray-500">입장하려면 클릭하세요</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}