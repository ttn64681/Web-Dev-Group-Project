'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // TODO: Add form state
  // TODO: Add error handling
  // TODO: Add loading state
  // TODO: Add authentication logic
  // TODO: Add styling
  // TODO: Add form validation

  return (
    // entire page
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-[#0E0613] to-[#411F4B] overflow-hidden px-4 sm:px-6 md:px-8">
      {/* creating card effect on login box (basically borders)*/}
      <div className="border border-neon-pink rounded-2xl py-8 w-[310px] sm:w-[350px] md:w-[400px] bg-login-bg-purple/[24%] overflow-hidden shadow-[0_3px_35px_rgba(248,138,255,0.3)]">
        {/* login container */}
        <div className="flex flex-col justify-center items-center w-full h-auto gap-6">
          {/* gap between logo and Login title */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/logo/logo-horizontal_730x209.png"
              alt="CourseHub Horizontal Logo"
              width={365}
              height={104.5}
              className="w-[80px] min-w-[100px] md:w-[120px]"
            />
            <h1 className="text-white text-center font-nunito text-4xl md:text-5xl [text-shadow:0_0_4px_rgba(127,34,163,1.0)]">
              Login
            </h1>
          </div>
          {/* input fields and login button */}
          <form className="flex flex-col justify-center items-center gap-6 w-[85%] ">
            <input
              className="h-11 md:h-12 w-[90%] rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white text-base md:text-lg"
              type="text"
              placeholder="Username"
            />
            <input
              className="h-11 md:h-12 w-[90%] rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white text-base md:text-lg"
              type="password"
              placeholder="Password"
            />
            <button
              className="h-11 md:h-12 w-[90%] bg-gray-200 rounded-full m-1 text-lg md:text-xl font-bold text-[rgb(40,22,47)]"
              type="submit"
            >
              Login
            </button>
          </form>
          {/* linking to register page */}
          <p className="text-white text-center text-sm md:text-base">
            Don't have an account?{' '}
            <Link className="underline font-bold" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
