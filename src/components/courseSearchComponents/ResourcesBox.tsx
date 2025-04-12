"use client";
import React, { useState, useEffect } from "react";
import LinkUnit from "./LinkUnit";
import VideoPostUnit from "./VideoPostUnit";

const ResourcesBox: React.FC = () => {
    return (
        <div>
            <div className="p-[30px]">
                <h3 className="text-[#F88AFF]">AI Top-5 Recommended</h3>
                <div>
                    <LinkUnit />
                    <LinkUnit />
                    <LinkUnit />
                </div>
            </div>
            <div className="bg-[#33203A] p-[30px] rounded-[20px]">
                <h3 className="text-white pl-[40px] pb-[20px] font-bold fon">Student Top Recommended:</h3>
                <div className="flex justify-between pl-[40px] pr-[40px] flex-wrap">
                    <VideoPostUnit />
                    <VideoPostUnit />
                    <VideoPostUnit />
                </div>
            </div>
        </div>
    );
}

export default ResourcesBox;