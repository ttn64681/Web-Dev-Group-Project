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

  const createUser = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      router.push('/login?reason=account_created_successfully');
    } catch (error) {
      console.error("There was an error registering: ", error);
    }
  }

  const handleRegister = (username: string, password: string) => {
    // TODO: Implement login logic
    // This should be handled by the parent layout component
    createUser(username, password);
  };

  return <Register onRegister={handleRegister} />;
}
