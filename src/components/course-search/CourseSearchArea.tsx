'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MagnifyingGlass } from '@phosphor-icons/react';

const CourseSearchArea: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-[100%]">
      <div className="mx-[10px]">
        <h3 className="font-nunito text-[#765178]">Prefix</h3>
        <input
          type="text"
          placeholder="ABCD"
          className="w-[60px] h-8 sm:h-10 p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] font-inter text-white placeholder-opacity-40"
        />
      </div>
      <div className="mx-[10px]">
        <h3 className="font-nunito text-[#765178]">Number</h3>
        <input
          type="text"
          placeholder="1234"
          className="w-[60px] h-8 sm:h-10 p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] font-inter text-white placeholder-opacity-40"
        />
      </div>
      <div className="mx-[10px] grow">
        <h3 className="font-nunito text-[#765178]">Course Name</h3>
        <div className="flex max-w-[650px]">
          <input
            type="text"
            placeholder="English Composition I"
            className="w-full h-8 sm:h-10 p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] font-inter text-white placeholder-opacity-40 "
          />
          <button className="h-8 sm:h-10 px-[5px] sm:p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]">
            <MagnifyingGlass size={24} className="align-middle" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchArea;
