import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Head from "next/head";

export default function Match() {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("자하연 식당");
  const [peopleCount, setPeopleCount] = useState("2");
  const [date, setDate] = useState(""); // 날짜 상태 추가
  const router = useRouter();

  const handleMatch = async () => {
    if (!time || !location || !peopleCount || !date) {
      alert("시간, 날짜, 위치, 인원 수를 입력해주세요.");
      return;
    }

    try {
      await addDoc(collection(db, "matches"), {
        time,
        location,
        peopleCount: Number(peopleCount),
        date, // 날짜 추가
        createdAt: Timestamp.now(),
      });

      alert("매칭 정보가 저장되었습니다!");
      setTime("");
      setLocation("자하연 식당");
      setPeopleCount("2");
      setDate(""); // 날짜 초기화

      router.push("/"); // 매칭 후 홈으로 이동
    } catch (error) {
      console.error("저장 실패:", error);
      alert("매칭 정보를 저장하는 데 실패했습니다.");
    }
  };

  return (
    <>
      <Head>
        <title>매칭 시작하기 - 혼밥 메이트</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">같이 식사할 사람 찾기</h1>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">식사 날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">식사 시간</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">위치</label>
            <input
              type="text"
              placeholder="예: 강남역, 홍대, 신촌"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">함께하고 싶은 인원 수</label>
            <select
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
            </select>
          </div>

          <button
            onClick={handleMatch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded w-full text-lg"
          >
            같이 먹을 사람 찾기
          </button>
        </div>
      </main>
    </>
  );
}
