'use client';
import React from 'react';
import Link from 'next/link';
import { House, ArrowLeft } from '@phosphor-icons/react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#1A0F1F] text-white p-4">
      <div className="text-center">
        <h1 className="text-[8rem] font-bold text-[#6CFEFE] drop-shadow-[0_0_15px_rgba(108,254,254,0.7)] mb-4">
          404
        </h1>
        <h2 className="text-[2.5rem] font-bold text-[#F88AFF] drop-shadow-[0_0_10px_rgba(248,138,255,0.7)] mb-6">
          Page Not Found
        </h2>
        <p className="text-[1.2rem] text-[#E2D0E6] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#33203A] border-2 border-[#6CFEFE] rounded-lg text-[#6CFEFE] hover:bg-[#3D2547] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(108,254,254,0.5)]"
          >
            <House size={24} weight="fill" />
            <span>Go Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#33203A] border-2 border-[#F88AFF] rounded-lg text-[#F88AFF] hover:bg-[#3D2547] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(248,138,255,0.5)]"
          >
            <ArrowLeft size={24} weight="fill" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
      
      <Link href="/" className="group">
        <div className="flex justify-center items-center mt-20 group">
         <p className="absolute bottom-10 text-center text-footer-purple group-hover:scale-102 hover:text-neon-pink/80 transition-all duration-300">©CourseHub | Web Programming | 2025</p>
        </div>
      </Link>
    </div>
  );
}