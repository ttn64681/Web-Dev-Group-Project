'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MagnifyingGlass } from '@phosphor-icons/react';

const CourseSearchArea: React.FC = () => {
  return (
    <div className="flex w-[100%]">
      <div className="ml-[10px] mr-[10px]">
        <h3 className="text-[#765178]">Prefix</h3>
        <input
          type="text"
          placeholder="ABCD"
          className="w-[60px] p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] text-white placeholder-opacity-40"
        />
      </div>
      <div className="ml-[10px] mr-[10px]">
        <h3 className="text-[#765178]">Number</h3>
        <input
          type="text"
          placeholder="XXXX"
          className="w-[60px] p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] text-white placeholder-opacity-40"
        />
      </div>
      <div className="ml-[10px] mr-[10px] grow">
        <h3 className="text-[#765178]">Course Name</h3>
        <div className="flex max-w-[500px]">
          <input
            type="text"
            placeholder="Course Name"
            className="p-[5px] w-[400px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40 "
          />
          <button className="p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]">
            <MagnifyingGlass size={24} className="align-middle" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchArea;
