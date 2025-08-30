'use client';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (username: string) => {
    // This should be handled by the parent layout component
    router.push('/');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login onLogin={handleLogin} />
    </Suspense>
  );
}
