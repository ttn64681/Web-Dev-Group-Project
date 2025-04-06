"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication state management
  const isAuthenticated = false;
  const username = undefined;

  const handleLogin = (username: string) => {
    // TODO: Implement login logic
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar
          isAuthenticated={isAuthenticated}
          username={username}
          onLogout={handleLogout}
        />
        {children}
      </body>
    </html>
  );
}
