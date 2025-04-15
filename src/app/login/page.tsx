'use client';

import { useRouter } from 'next/navigation';
import Login from '@/components/Login';

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
    router.push('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-[#0E0613] to-[#411F4B]">
      <Login onLogin={handleLogin} />
    </div>
  );
}
