'use client';
import mongoose, { Types } from 'mongoose';
import React, { useState, useEffect } from 'react';
import LinkUnit from './LinkUnit';
import VideoPostUnit from './VideoPostUnit';
import { Course } from '@/dbInterface/dbOperations';
import { Post } from '@/dbInterface/dbOperations';
import { useSession } from 'next-auth/react';

type ResourcesBoxProps = {
  isCourseSelected: boolean,
  courseInfo?: Course
}

const ResourcesBox: React.FC<ResourcesBoxProps> = ({
  isCourseSelected,
  courseInfo
} : ResourcesBoxProps) => {

  const [linkUnitNum, setLinkUnitNum] = useState(1);
  const [postsInfo, setPostsInfo] = useState<Post[]>([]);

  const {data: session, status} = useSession();

  // Generates a unique number for each link unit starting at 1
  const handleLinkGenerate = () => {
    setLinkUnitNum((prev) => prev + 1);
    return linkUnitNum;
  };

  /**
   * Retrieves the post JSONs from an array of object ids of posts
   * @param postIdArr - Array of post ids incorporated in course
   */
  const retrievePostInfo = async (postIdArr: string[]) => {
    if (!postIdArr || postIdArr.length === 0) {
      setPostsInfo([]);
      return;
    }
  
    const retrievedPosts = [];
  
    try {
      for (const postId of postIdArr) {
        try {
          const response = await fetch(`/api/posts/${postId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch post ${postId}`);
          }
  
          const postData = await response.json();
          retrievedPosts.push(postData.post);
        } catch (err) {
          console.warn(`Skipping post ${postId} due to fetch error.`, err);
        }
      }
  
      setPostsInfo(retrievedPosts);
    } catch (error) {
      console.error('Unexpected error fetching posts:', error);
      setPostsInfo([]); // Fallback
    }
  };

  /*
    Checks if a user has liked before
  */
  const checkHasLikedBefore = (likeArray: string[]) => {

      //User ID check
      const userId = session?.user?.id
  
      //If user is not authenticated, it is false for them and they cannot like.
      if (!userId) {
        return false;
      }

      //likeArray should be an array of ObjectId[]
      for (let i = 0; i < likeArray.length; i++) {
        const stringifiedId = likeArray[i].toString();

        if (userId == stringifiedId) {
          return true
        }
      }
      
      return false;

  }


  //When mounted, postInfo is updated accordingly
  useEffect(() => {
    if (courseInfo?.posts) {
      retrievePostInfo(courseInfo.posts);
    } else {
      setPostsInfo([]);
    }
  }, [courseInfo?.posts]);

  return (
    <div>
      {/* AI LINKS DISPLAY*/}
      <div className="pt-[20px] pb-[30px] px-[40px]">
        <h3 className="text-[#F88AFF] font-bold text-[1.2em]">AI Top-5 Recommended</h3>
        {
          isCourseSelected ? 
            <div>
              {
                courseInfo?.resourceUrls && 
                courseInfo?.resourceUrls.map((resource: {url: string, description: string}, index : number) => (
                    <LinkUnit 
                      key={resource.url}
                      number={index + 1}
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
      <div className="bg-[#33203A] p-[15px] rounded-[12px]">
        <h3 className="text-white p-[20px] font-bold text-[1.2em]">Student Top Recommended:</h3>
        {
         isCourseSelected ? 
          <div className="flex justify-between pl-[40px] pr-[40px] flex-wrap">
            {
              postsInfo.map((post) => {

                //Determine if user has liked the post
                const hasLikedBefore = checkHasLikedBefore(post.likes);
              
                //Render videopost unit
                return (
                  <VideoPostUnit 
                    key={post._id || ''} 
                    forumMode={false}  
                    postId={post._id || ''} 
                    courseId={courseInfo?.courseId || ''} 
                    thumbnail={post.thumbnail || ''} 
                    likes={post.likes?.length || 0} 
                    username={post.user} 
                    isLiked={hasLikedBefore}
                  />
                );
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
