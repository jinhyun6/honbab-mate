import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const username = result.user.displayName || "익명";
      localStorage.setItem("username", username);

      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>로그인 - 혼밥 메이트</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            로그인하고 시작하세요
          </h1>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-sm transition"
          >
            Google 계정으로 로그인
          </button>
        </div>
      </main>
    </>
  );
}