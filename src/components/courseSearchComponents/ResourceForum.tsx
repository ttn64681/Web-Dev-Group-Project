"use client";
import React, { useState, useEffect } from "react";
import VideoPostUnit from "./VideoPostUnit";
import Comment from "./Comment";

const ResourceForum: React.FC = () => {
    return (
        <div>
            <div>
                <VideoPostUnit />
                <div>
                    <h3>Video Title</h3>
                    <h3>Video Description</h3>
                </div>
            </div>
            <div>
                <h3>Leave a Comment!</h3>
                <textarea placeholder="Place your comment here."></textarea>
            </div>
            <div>
                <h1>Comments</h1>
                <div>
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
        </div>
    );
}

export default ResourceForum;