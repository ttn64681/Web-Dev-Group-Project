"use client";

import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Folders } from "@phosphor-icons/react";
import { UsersThree } from "@phosphor-icons/react";

// Home Page
export default function Home() {
  // TODO: Add styling
  // TODO: Add proper content

  return (
    <div className="flex flex-col items-center">
      {/* Splash */}
      <div className="border-4 border-dashed border-neon-pink rounded-lg p-8 m-12 min-w-[40%] max-w-[90%]">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-dongle text-4xl font-bold text-neon-pink">
              Welcome to
            </h1>
            <h1 className="font-dongle text-5xl font-extrabold text-neon-pink">
              CourseHub!
            </h1>
          </div>
          <p className="font-nunito text-lg text-neon-pink-subtitle">
            Your one-stop platform for UGA course resources
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-row justify-center items-center flex-wrap items-center gap-12">
        <div className="flex flex-col items-center gap-5">
          <div className="border-2 border-neon-cyan rounded-lg px-20 py-6">
            <MagnifyingGlass className="text-neon-cyan" size={85} />
          </div>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Course Search
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="border-2 border-neon-orange rounded-lg px-20 py-6">
            <Folders className="text-neon-orange" size={85} />
          </div>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Shared Resources
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="border-2 border-neon-violet rounded-lg px-20 py-6">
            <UsersThree className="text-neon-violet" size={85} />
          </div>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Contribute
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
      </div>

      {/* Get Started Button */}
      <button className="bg-neon-cyan text-[1.2rem] font-bold rounded-full px-5 py-2 text-black">
        <Link href="/course-search">Get Started!</Link>
      </button>
    </div>
  );
}
