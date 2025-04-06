"use client";

import { Inter, Dongle, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dongle = Dongle({ subsets: ["latin"], variable: "--font-dongle" });

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
      <body
        className={`${inter.className} ${dongle.className} ${nunito.className}`}
      >
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
