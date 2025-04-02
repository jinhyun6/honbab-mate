import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const username = typeof window !== "undefined" && localStorage.getItem("username");
    const protectedRoutes = ["/match", "/chat", "/chat-list"];

    const isProtected = protectedRoutes.some((route) =>
      router.pathname.startsWith(route)
    );

    if (!username && isProtected) {
      router.push("/login");
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}