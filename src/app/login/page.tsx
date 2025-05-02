'use client';
import { Suspense } from 'react';
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
    // This should be handled by the parent layout component
    router.push('/');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login onLogin={handleLogin} />
    </Suspense>
  );
}
