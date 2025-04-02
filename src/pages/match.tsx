import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export default function Match() {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("자하연 식당");
  const [peopleCount, setPeopleCount] = useState("2");
  const router = useRouter();

  const handleMatch = async () => {
    if (!time || !location || !peopleCount) {
      alert("시간, 위치, 인원 수를 입력해주세요.");
      return;
    }

    const username = localStorage.getItem("username") || "익명";
    const today = new Date().toISOString().split("T")[0];
    const roomId = `${today}_${time}_${location}_${peopleCount}명`;

    try {
      const q = query(
        collection(db, "matches"),
        where("time", "==", time),
        where("location", "==", location),
        where("peopleCount", "==", Number(peopleCount))
      );
      const querySnapshot = await getDocs(q);
      const matchedCount = querySnapshot.size;

      await addDoc(collection(db, "matches"), {
        time,
        location,
        peopleCount: Number(peopleCount),
        username,
        createdAt: Timestamp.now(),
      });

      alert("매칭 정보가 저장되었습니다!");
      setTime("");
      setLocation("자하연 식당");
      setPeopleCount("2");

      if (matchedCount + 1 >= Number(peopleCount)) {
        await addDoc(collection(db, "chats"), {
          roomId,
          createdAt: Timestamp.now(),
        });
        router.push(`/chat/${encodeURIComponent(roomId)}`);
      }
    } catch (error) {
      console.error("매칭 실패:", error);
      alert("매칭 처리 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>매칭 시작하기 - 혼밥 메이트</title>
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
            같이 식사할 사람 찾기
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">식사 시간</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">장소</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              >
                <option value="학생회관 식당">학생회관 식당</option>
                <option value="자하연 식당">자하연 식당</option>
                <option value="예술계 식당">예술계 식당</option>
                <option value="수의대 식당">수의대 식당</option>
                <option value="두레미담">두레미담</option>
                <option value="동원관 식당">동원관 식당</option>
                <option value="기숙사 식당">기숙사 식당</option>
                <option value="공대간이 식당">공대간이 식당</option>
                <option value="감골 식당">감골 식당</option>
                <option value="75-1동 식당">75-1동 식당</option>
                <option value="3식당">3식당</option>
                <option value="302동 식당">302동 식당</option>
                <option value="301동 식당">301동 식당</option>
                <option value="220동 식당">220동 식당</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">함께하고 싶은 인원 수</label>
              <select
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              >
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
              </select>
            </div>

            <button
              onClick={handleMatch}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-xl py-3 transition"
            >
              같이 먹을 사람 찾기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
