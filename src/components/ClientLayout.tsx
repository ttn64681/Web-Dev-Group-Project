'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { doLogout } from '@/app/actions';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();
  useEffect(() => {}, [session]);

  // TODO: Add authentication state management
  const isAuthenticated = false;
  const username = undefined;

  const handleLogout = () => {
    doLogout();
  };

  return (
    <SessionProvider>
      <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
      {children}
    </SessionProvider>
  );
} 