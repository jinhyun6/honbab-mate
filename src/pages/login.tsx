import { app } from "../firebase";  // 여기서 app을 import
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);  // app을 사용하여 인증
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
    <div>
      <h1>로그인</h1>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
    </div>
  );
}
