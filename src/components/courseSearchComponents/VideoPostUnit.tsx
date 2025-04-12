"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoveBtn from "./LoveBtn";
import TrashBtn from "./TrashBtn";

const VideoPostUnit: React.FC = () => {
    return (
        <div >
            <button className="hover:scale-110 transition-transform duration-200">
                <Image src={"https://picsum.photos/id/16/254/154"} alt={"Video thumbnail"} width={264} height={154} className="rounded-[10px]"/>
            </button>
            <div className="flex justify-between">
                <div className="flex p-[10px] justify-between w-[100px]">
                    <LoveBtn />
                    <TrashBtn />
                </div>
                <div className="p-[10px] pr-[20px]">
                    <h4 className="text-white">user123</h4>
                </div>
            </div>
        </div>
    );
}

export default VideoPostUnit;