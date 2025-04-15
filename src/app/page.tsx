'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Folders } from '@phosphor-icons/react';
import { UsersThree } from '@phosphor-icons/react';

// Home Page
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Splash */}
      <div className="border-4 border-dashed border-neon-pink rounded-lg p-8 m-16 min-w-[40%] max-w-[90%] [box-shadow:0_0_15px_rgba(255,105,180,0.5),inset_0_0_15px_rgba(255,105,180,0.5)]">
        <div className="flex flex-col justify-center items-center gap-3">
          <Image
            src="/logo/logo-horizontal_730x209.png"
            alt="CourseHub Logo"
            width={365}
            height={104.5}
            className="w-1/2 min-w-[200px]"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-dongle text-4xl font-bold text-neon-pink">Welcome to</h1>
            <h1 className="font-dongle text-5xl font-extrabold text-neon-pink [text-shadow:0_0_10px_rgba(255,105,180,0.5)] hover:[text-shadow:0_0_10px_rgba(255,105,180,0.8)] hover:scale-105 transition-all duration-300">
              CourseHub!
            </h1>
          </div>
          <p className="font-nunito text-xl text-neon-pink-subtitle max-w-[80%] text-center">
            Your one-stop hub to find and share UGA course resources.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-row justify-center items-start flex-wrap gap-12 max-w-[70%] mb-12">
        <div className="flex flex-col items-center gap-1 flex-1">
          <Link
            href="/course-search"
            className="group border-2 border-neon-cyan rounded-lg px-20 py-6 mb-4 hover:scale-105 transition-all duration-300 hover:[box-shadow:0_0_15px_rgba(0,255,255,0.5),inset_0_0_15px_rgba(0,255,255,0.5)]"
          >
            <MagnifyingGlass
              className="text-neon-cyan group-hover:scale-110 transition-transform duration-300"
              size={85}
            />
          </Link>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">Course Search</h1>
          <p className="font-nunito text-white text-xl max-w-[80%] text-center">
            Search a course to receive an A.I. powered overview, plan-for-success and study
            resources!
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1">
          <Link
            href="/course-search"
            className="group border-2 border-neon-orange rounded-lg px-20 py-6 mb-4 hover:scale-105 transition-all duration-300 hover:[box-shadow:0_0_15px_rgba(255,165,0,0.5),inset_0_0_15px_rgba(255,165,0,0.5)]"
          >
            <Folders
              className="text-neon-orange group-hover:scale-110 transition-transform duration-300"
              size={85}
            />
          </Link>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink text-nowrap">
            Shared Resources
          </h1>
          <p className="font-nunito text-white text-xl max-w-[80%] text-center">
            View study resources curated by A.I. or fellow students: Youtube videos, links, and even
            music!
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1 max-w-[60%]]">
          <Link
            href="/contribute"
            className="group border-2 border-neon-violet rounded-lg px-20 py-6 mb-4 hover:scale-105 transition-all duration-300 hover:[box-shadow:0_0_15px_rgba(238,130,238,0.5),inset_0_0_15px_rgba(238,130,238,0.5)]"
          >
            <UsersThree
              className="text-neon-violet group-hover:scale-110 transition-transform duration-300"
              size={85}
            />
          </Link>
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">Contribute</h1>
          <p className="font-nunito text-white text-xl max-w-[80%] text-center">
            Share your own resources, add to the catalogue, and interact with the CourseHub
            Community!
          </p>
        </div>
      </div>

      {/* Get Started Button */}
      <button className="bg-neon-cyan text-[1.2rem] font-bold rounded-full px-6 py-3 text-black group hover:scale-105 transition-all duration-300 hover:[box-shadow:0_0_15px_rgba(0,255,255,0.5),inset_0_0_15px_rgba(0,255,255,0.5)]">
        <div className="group-hover:scale-110 transition-all duration-300">
          <Link href="/course-search">Get Started!</Link>
        </div>
      </button>

      <div className="flex justify-center items-center mt-20">
        <p className="text-center text-footer-purple mb-6">CourseHub | Web Programming | 2025</p>
      </div>

    </div>
  );
}
