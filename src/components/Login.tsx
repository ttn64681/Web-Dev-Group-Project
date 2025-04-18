'use client';
import React, { FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { doCredentialLogin } from '@/app/actions';
import { useRouter } from 'next/navigation';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const router = useRouter();
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
      const response = await doCredentialLogin(formData);
      router.push('/');

      if (response?.error) {
        console.error(response.error);
        //setError(response.error.message || "An error occured");
      } else {
        
      }
    } catch (e: any) {
      console.error(e);
      console.log("There was an error logging in");
      //setError("Check your Credentials");
    }
  }

  return (
    // entire page
    <div className="flex flex-col items-center">
      {/* creating card effect on login box (basically borders)*/}
      <div className="border border-neon-pink rounded-2xl py-8 m-16 min-w-[30%] bg-login-bg-purple/[24%] overflow-hidden shadow-xl/20 shadow-[0_3px_35px_rgba(248,138,255,0.3)]">
        {/* defining grid */}
        <div className="grid content-center justify-items-center w-[400px] h-[400px] grid-rows-[1/7_1/7_4/7_1/7] gap-6">
          {/* gap between logo and Login title */}
          <div className="grid content-center justify-items-center gap-2">
            <Image
              src="/logo/logo-horizontal_730x209.png"
              alt="CourseHub Horizontal Logo"
              width={365}
              height={104.5}
              className="w-[120px] min-w-[100px]"
            />
            <h1 className="text-white text-center font-nunito text-5xl [text-shadow:0_0_4px_rgba(127,34,163,1.0)]">
              Login
            </h1>
          </div>
          {/* input fields and login button */}
          <form className="grid grid-cols-1 grid-rows-3 content-center justify-center gap-6 w-[85%]"
          onSubmit={handleSubmit}>
            <input
              className="h-12 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white text-lg"
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              className="h-12 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white text-lg"
              type="password"
              placeholder="Password"
              name="password"
            />
            <button
              className="h-12 bg-gray-200 rounded-full m-1 text-xl font-bold text-[rgb(40,22,47)]"
              type="submit"
            >
              Login
            </button>
          </form>
          {/* linking to register page */}
          <p className="text-white text-center text-base">
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
