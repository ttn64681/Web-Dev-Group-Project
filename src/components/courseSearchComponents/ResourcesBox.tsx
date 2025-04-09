"use client";
import React, { useState, useEffect } from "react";
import LinkUnit from "./LinkUnit";
import VideoPostUnit from "./VideoPostUnit";

const ResourcesBox: React.FC = () => {
    return (
        <div>
            <div>
                <h3>AI Top-5 Recommended</h3>
                <div>
                    <LinkUnit />
                    <LinkUnit />
                    <LinkUnit />
                </div>
            </div>
            <div>
                <h3>Student Top Recommended:</h3>
                <div>
                    <VideoPostUnit />
                    <VideoPostUnit />
                    <VideoPostUnit />
                </div>
            </div>
        </div>
    );
}

export default ResourcesBox;