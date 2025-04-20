'use client';
import mongoose from 'mongoose';
import React, { useState, useEffect } from 'react';
import LinkUnit from './LinkUnit';
import VideoPostUnit from './VideoPostUnit';
import { Course } from '@/dbInterface/dbOperations';

type ResourcesBoxProps = {
  isCourseSelected: boolean,
  courseInfo: Course
}

type Post = {
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  postType: 'youtube' | 'link' | 'music';
  course: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: Array<{
    // Array of comment objects on the post
    user: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date; // for sorting/filtering purposes only
  updatedAt: Date; // for sorting/filtering purposes only
}

const ResourcesBox: React.FC<ResourcesBoxProps> = ({isCourseSelected, courseInfo} : ResourcesBoxProps) => {

  const [linkUnitNum, setLinkUnitNum] = useState(1)

  /**
   * 
   * @returns 
   */
  const handleLinkGenerate = () => {
    setLinkUnitNum(linkUnitNum => linkUnitNum + 1)
    return linkUnitNum - 1;
  }

  // TODO: FETCH ALL POSTS INSIDE COURSE ID
  // const posts = getPosts()

  const postsInfo = [{
    title: "TITLE",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/16/254/154",
    thumbnail: "https://picsum.photos/id/16/254/154",
    postType: 'youtube',
    course: "fdsafjdsfdsf",
    user: "person1",
    likes: ["fdsfs", "fdjfdfaf", "fdfafdas"],
    comments: [
      {
        user: "person2",
        comment: "Good video",
        createdAt: "12-08-2022"
      }
    ],
    createdAt: "12-08-2022", 
    updatedAt: "12-08-2022" 
  }]

  return (
    <div>
      {/* AI LINKS DISPLAY*/}
      <div className="p-[30px]">
        <h3 className="text-[#F88AFF]">AI Top-5 Recommended</h3>
        {
          isCourseSelected ? 
            <div>
              {
                courseInfo?.resourceUrls.map((resource: {url: string, description: string}) => (
                    <LinkUnit 
                      key={resource.url}
                      number={handleLinkGenerate()}
                      link={resource.url}
                      description={resource.description}
                    />
                ))
              }
            </div>
          :
            <div>
              <LinkUnit number={1} link="https://example.com" description="A good example"/>
              <LinkUnit number={2} link="www.google.com" description="Google it."/>
            </div>
        }
      </div>

      {/* VIDEOS DISPLAY */}
      <div className="bg-[#33203A] p-[30px] rounded-[20px]">
        <h3 className="text-white pl-[40px] pb-[20px] font-bold fon">Student Top Recommended:</h3>
        {
         isCourseSelected ? 
          <div className="flex justify-between pl-[40px] pr-[40px] flex-wrap">
            {
              postsInfo.map((post) => {
                //Determine if user has liked the post
                /*
                 * 
                 *
                 */
                let hasLikedBefore = false;

                //Render videopost unit
                const videoUnit = <VideoPostUnit key={post.title} forumMode={false} thumbnail={post.thumbnail} likes={post.likes.length} username={post.user} isLiked={hasLikedBefore}/>
                return videoUnit;
              })
            }
          </div>
         :
            <div className="flex justify-between pl-[40px] pr-[40px] flex-wrap">
              <VideoPostUnit forumMode={false} thumbnail="https://picsum.photos/id/5/264/154" likes={1} username="person1" isLiked={true}/>
              <VideoPostUnit forumMode={false} thumbnail="https://picsum.photos/id/10/264/154" likes={2} username="person2" isLiked={true}/>
              <VideoPostUnit forumMode={false} thumbnail="https://picsum.photos/id/15/264/154" likes={3} username="person3" isLiked={false}/>
            </div>
        }
      </div>

    </div>
  );
};

export default ResourcesBox;
