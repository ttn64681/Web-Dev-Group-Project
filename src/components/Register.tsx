'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Register: React.FC = () => {
  // TODO: Add form state
  // TODO: Add error handling
  // TODO: Add loading state
  // TODO: Add authentication logic
  // TODO: Add styling
  // TODO: Add form validation

  return (
    // entire page
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#0E0613] to-[#411F4B]">
      {/* creating card effect on login box (basically borders)*/}
      <div className="border border-neon-pink rounded-2xl py-5 m-16 min-w-[20%] bg-login-bg-purple/[24%] overflow-hidden shadow-xl/20 shadow-[0_3px_35px_rgba(248,138,255,0.3)]">
        {/* defining grid */}
        <div className="grid content-center justify-items-center w-[340px] h-[340px] grid-rows-[1/7_1/7_4/7_1/7] gap-5">
          {/* gap between logo and Register title */}
          <div className="grid content-center justify-items-center gap-1">
            <Image
              src="/logo/logo-horizontal_730x209.png"
              alt="CourseHub Horizontal Logo"
              width={365}
              height={104.5}
              className="w-[85px] min-w-[75px] "
            />
            <h1 className="text-white text-center font-nunito text-4xl [text-shadow:0_0_4px_rgba(127,34,163,1.0)]">
              Register
            </h1>
          </div>
          {/* input fields and register button */}
          <form className="grid grid-cols-1 grid-rows-3 content-center justify-center gap-5 w-[80%]">
            <input
              className="h-10 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white"
              type="text"
              placeholder="Username"
            />
            <input
              className="h-10 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white"
              type="password"
              placeholder="Password"
            />
            <button
              className="h-10 bg-gray-200 rounded-full m-1 text-lg font-bold text-[rgb(40,22,47)]"
              type="submit"
            >
              Register
            </button>
          </form>
          {/* linking to register page */}
          <p className="text-white text-center text-sm">
            Already have an account?{' '}
            <Link className="underline font-bold" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
