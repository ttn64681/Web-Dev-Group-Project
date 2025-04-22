'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MagnifyingGlass } from '@phosphor-icons/react';

type CourseSearchAreaProps = {
  submitFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CourseSearchArea: React.FC<CourseSearchAreaProps> = ({
  submitFunc,
  editFunc
}: CourseSearchAreaProps) => {
  // Add a form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    // Create a proper button click event
    const buttonEvent = {
      preventDefault: () => {},
      currentTarget: document.querySelector('button[type="submit"]') as HTMLButtonElement
    } as React.MouseEvent<HTMLButtonElement>;
    submitFunc(buttonEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-[100%]">
        <div className="ml-[10px] mr-[10px]">
          <h3 className="text-[#765178]">Prefix</h3>
          <input
            type="text"
            name="prefix"
            placeholder="ABCD"
            className="w-[60px] p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] text-white placeholder-opacity-40"
            onChange={editFunc}
            minLength={4}
            maxLength={4}
            required
          />
        </div>
        <div className="ml-[10px] mr-[10px]">
          <h3 className="text-[#765178]">Number</h3>
          <input
            type="text"
            name="courseNum"
            placeholder="XXXX"
            className="w-[60px] p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-[10px] text-white placeholder-opacity-40"
            onChange={editFunc}
            minLength={4}
            maxLength={4}
            required
          />
        </div>
        <div className="ml-[10px] mr-[10px] grow">
          <h3 className="text-[#765178]">Course Name</h3>
          <div className="flex max-w-[500px]">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              className="p-[5px] w-[400px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40"
              onChange={editFunc}
              required
            />
            <button 
              type="submit" 
              className="p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]"
              aria-label="Search course"
            >
              <MagnifyingGlass size={24} className="align-middle" color="white" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CourseSearchArea;
