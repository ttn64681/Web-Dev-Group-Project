'use client';

import { useRouter } from 'next/navigation';
import Register from '@/components/Register';

export default function RegisterPage() {
  const router = useRouter();
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states
  // TODO: Add authentication redirect

  const handleRegister = (username: string) => {
    // TODO: Implement login logic
    // This should be handled by the parent layout component
    router.push('/');
  };

  return <Register onRegister={handleRegister} />;
}
