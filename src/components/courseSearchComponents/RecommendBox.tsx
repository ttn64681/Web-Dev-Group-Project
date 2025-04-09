"use client";
import React, { useState, useEffect } from "react";
import VideoPostUnit from "./VideoPostUnit";


const RecommendBox: React.FC = () => {
    return (
        <div>
            <h4>Student Top Recommended: </h4>
            <div>
                <VideoPostUnit />
                <VideoPostUnit />
                <VideoPostUnit />
            </div>
        </div>
    );
}

export default RecommendBox;
