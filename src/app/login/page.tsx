"use client";

import { useRouter } from "next/navigation";
import Login from "@/components/Login";

export default function LoginPage() {
  const router = useRouter();
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states
  // TODO: Add authentication redirect

  const handleLogin = (username: string) => {
    // TODO: Implement login logic
    // This should be handled by the parent layout component
    router.push("/");
  };

  return <Login onLogin={handleLogin} />;
}
