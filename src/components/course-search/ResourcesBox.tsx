'use client';
import mongoose from 'mongoose';
import React, { useState, useEffect } from 'react';
import LinkUnit from './LinkUnit';
import VideoPostUnit from './VideoPostUnit';
import { Course } from '@/dbInterface/dbOperations';
import { Post } from '@/dbInterface/dbOperations';

type ResourcesBoxProps = {
  isCourseSelected: boolean,
  courseInfo: Course
}

const ResourcesBox: React.FC<ResourcesBoxProps> = ({isCourseSelected, courseInfo} : ResourcesBoxProps) => {

  const [linkUnitNum, setLinkUnitNum] = useState(1)
  const [postsInfo, setPostsInfo] = useState<Post[]>([])

  /**
   * 
   * @returns 
   */
  const handleLinkGenerate = () => {
    setLinkUnitNum(linkUnitNum => linkUnitNum + 1)
    return linkUnitNum - 1;
  }

  /**
   * Retrieves the post JSONs from an array of object ids of posts
   * @param postIdArr - Array of post ids incorporated in course
   */
  const retrievePostInfo = async (postIdArr: string[]) => {

    //Initialize empty array
    let retrievedPosts = [];

    //Retrieve information from each postId and pushes to postsInfo
    for (let i = 0; i < postIdArr.length; i++) {
      const response = await fetch(`api/posts/${postIdArr[i]}`, {
        method: 'GET'
      }) 

      retrievedPosts.push(await response.json());
    }

    setPostsInfo(retrievedPosts);

  }

  //When mounted, postInfo is updated accordingly
  useEffect(() => {
    if (!courseInfo.posts) {
      return;
    }

    retrievePostInfo(courseInfo.posts);
  },[])

  return (
    <div>
      {/* AI LINKS DISPLAY*/}
      <div className="p-[30px]">
        <h3 className="text-[#F88AFF]">AI Top-5 Recommended</h3>
        {
          isCourseSelected ? 
            <div>
              {
                courseInfo.resourceUrls && 
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
                 */
                let hasLikedBefore = false;

                //Render videopost unit
                const videoUnit = <VideoPostUnit key={post.title} forumMode={false}  postId={post._id.$oid} courseId={courseInfo._id.$oid} thumbnail={post.thumbnail} likes={post.likes.length} username={post.user} isLiked={hasLikedBefore}/>
                return videoUnit;
              })
            }
          </div>
         :
            <div className="flex justify-between pl-[40px] pr-[40px] flex-wrap">
              <VideoPostUnit forumMode={false} postId="1" courseId="1" thumbnail="https://picsum.photos/id/5/264/154" likes={1} username="person1" isLiked={true}/>
              <VideoPostUnit forumMode={false} postId="2" courseId="2" thumbnail="https://picsum.photos/id/10/264/154" likes={2} username="person2" isLiked={true}/>
              <VideoPostUnit forumMode={false} postId="3" courseId="3" thumbnail="https://picsum.photos/id/15/264/154" likes={3} username="person3" isLiked={false}/>
            </div>
        }
      </div>

    </div>
  );
};

export default ResourcesBox;
