// src/pages/login.tsx

import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.displayName) {
        localStorage.setItem("username", user.displayName);
      }

      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Head>
        <title>로그인 - 혼밥 메이트</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">혼밥 메이트 로그인</h1>
        <p className="mb-8 text-gray-600">Google 계정으로 로그인하여 시작하세요.</p>
        <button
          onClick={handleLogin}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Google 계정으로 로그인
        </button>
      </main>
    </>
  );
}
