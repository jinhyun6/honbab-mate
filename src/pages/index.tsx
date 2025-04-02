import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {username && (
        <p className="text-gray-700 text-lg mb-4">
          👋 안녕하세요, <strong>{username}</strong>님!
        </p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        함께 밥 먹을 사람, 지금 찾으세요
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        원하는 시간과 장소를 설정하고, 같이 밥 먹을 사람을 만나보세요.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg"
        onClick={() => (window.location.href = "/match")}
      >
        매칭 시작하기
      </button>
    </main>
  );
}
