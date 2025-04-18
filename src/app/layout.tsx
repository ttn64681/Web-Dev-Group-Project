'use client';

import { Inter, Dongle, Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';
import { doLogout } from './actions';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' }); // conventional variable names
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dongle = Dongle({
  subsets: ['latin'],
  variable: '--font-dongle',
  weight: ['300', '400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add authentication state management
  const isAuthenticated = false;
  const username = undefined;

  const handleLogin = (username: string) => {
    // TODO: Implement login logic
    // THIS HAPPENS INSIDE THE LOGIN COMPONENT
  };

  const handleLogout = () => {
    doLogout();
  };

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${dongle.className} ${nunito.className} bg-purple-dark-transition min-h-[calc(100vh-8rem)]`}
      >
        <SessionProvider>
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
