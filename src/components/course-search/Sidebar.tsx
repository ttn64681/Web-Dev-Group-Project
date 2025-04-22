'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { ArrowRight } from '@phosphor-icons/react';

const Sidebar: React.FC = () => {
  const [openStatus, setOpenStatus] = useState(true);

  const toggleOpen = () => {
    setOpenStatus(!openStatus);
    console.log('toggled');
  };

  return (
    <div className={`flex h-full transition-transform duration-300 ease-in-out`}>
      {/*Sidebar Contents*/}
      <div className={`bg-[#28162F] pl-[25px] pr-[25px] h-full ${openStatus ? 'block' : 'hidden'}`}>
        <div className="flex pt-[20px]">
          <h3 className="text-[#B590C4] mr-[20px]">Existing Classes: </h3>
          <select className="w-[100px] m-auto rounded-[10px] p-[5px] bg-transparent text-white border" title="Existing Classes">
            <option value="All" className="bg-[#28162F]">
              All
            </option>
          </select>
        </div>
        <hr className="my-[20px]"></hr>
        <div className="overflow-y-auto h-[calc(100%-100px)]">
          <h3 className="text-white mt-[10px] mb-[10px]">Class1</h3>
          <h3 className="text-white mt-[10px] mb-[10px]">Class2</h3>
          <h3 className="text-white mt-[10px] mb-[10px]">Class3</h3>
        </div>
      </div>

      {/*Tab-in and out button*/}
      <div>
        <button
          onClick={toggleOpen}
          className={`bg-[#28162F] mt-[10px] pt-[40px] pb-[40px] pl-[10px] pr-[10px] rounded-r-[5px] border border-[#F88AFF]`}
        >
          {openStatus ? (
            <ArrowLeft size={16} color="#F88AFF" />
          ) : (
            <ArrowRight size={16} color="#F88AFF" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
