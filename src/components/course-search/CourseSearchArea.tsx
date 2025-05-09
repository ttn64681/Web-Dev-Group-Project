'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MagnifyingGlass } from '@phosphor-icons/react';

type CourseSearchAreaProps = {
  submitFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CourseSearchArea: React.FC<CourseSearchAreaProps> = ({
  submitFunc,
  editFunc,
}: CourseSearchAreaProps) => {
  // Add a form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    // Create a proper button click event
    const buttonEvent = {
      preventDefault: () => {},
      currentTarget: document.querySelector('button[type="submit"]') as HTMLButtonElement,
    } as React.MouseEvent<HTMLButtonElement>;
    submitFunc(buttonEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap sm:flex-row sm:gap-0 w-[100%]">
        <div className="mx-[10px] mb-2 sm:mb-0">
          <h3 className="font-nunito text-[#765178]">Prefix</h3>
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
        <div className="mx-[10px] mb-2 sm:mb-0">
          <h3 className="font-nunito text-[#765178]">Number</h3>
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
        <div className="mx-[10px] grow">
          <h3 className="font-nunito text-[#765178]">Course Name</h3>
          <div className="flex w-full">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              className="grow p-[5px] min-w-[200px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40"
              onChange={editFunc}
              required
            />
            <button
              type="submit"
              className="h-10 px-[8px] bg-[#33203A] border-[2px] border-l-0 border-[#6CFEFE] rounded-r-[10px]"
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
