'use client';
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [message, setMessage] = useState('');

  // TODO: Add form state
  // TODO: Add error handling
  // TODO: Add loading state
  // TODO: Add authentication logic
  // TODO: Add styling
  // TODO: Add form validation

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      onRegister(username, password);
    } catch (error) {
      console.error(error);
      setMessage('Error during registration');
    }
  }

  return (
    // entire page
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-[#0E0613] to-[#411F4B] overflow-hidden px-4 sm:px-6 md:px-8">
      {/* creating card effect on Register box (basically borders)*/}
      <div className="border border-neon-pink rounded-2xl py-8 w-[310px] sm:w-[350px] md:w-[400px] bg-login-bg-purple/[24%] overflow-hidden shadow-[0_3px_35px_rgba(248,138,255,0.3)]">
        {/* Register container */}
        <div className="flex flex-col justify-center items-center w-full h-auto gap-6">
          {/* gap between logo and Register title */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/logo/logo-horizontal_730x209.png"
              alt="CourseHub Horizontal Logo"
              width={365}
              height={104.5}
              className="w-[80px] min-w-[100px] md:w-[120px]"
            />
            <h1 className="text-white text-center font-nunito text-4xl md:text-5xl [text-shadow:0_0_4px_rgba(127,34,163,1.0)]">
              Register
            </h1>
          </div>
          {/* input fields and register button */}
          <form
            className="flex flex-col items-center w-[80%] gap-7 my-1"
            onSubmit={handleSubmit}
          >
            <input
              className="h-11 md:h-12 w-[95%] rounded-2xl border border-white bg-neon-pink/[10%] p-4 text-white text-base md:text-lg"
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              className="h-11 md:h-12 w-[95%] rounded-2xl border border-white bg-neon-pink/[10%] p-4 text-white text-base md:text-lg"
              type="password"
              placeholder="Password"
              name="password"
            />
            <button
              className="h-11 md:h-12 w-[95%] bg-gray-200 rounded-full font-bold text-lg md:text-xl text-[rgb(40,22,47)]"
              type="submit"
            >
              Register
            </button>
          </form>
          {/* linking to register page */}
          <p className="text-white text-center text-sm md:text-base">
            Already have an account?{' '}
            <Link className="underline font-bold" href="/login">
              Login
            </Link>
          </p>
          {/* Message for errors or notifications */}
          {message && (
            <p className="text-white text-center text-sm md:text-base">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
