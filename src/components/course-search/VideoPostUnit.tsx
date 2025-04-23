'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoveBtn from './LoveBtn';
import TrashBtn from './TrashBtn';
import { useRouter } from 'next/navigation';
import User from "../../../src/app/models/userSchema";
import connectMongoDB from '../../../config/mongodb';
import { useSession } from 'next-auth/react';

type VideoPostUnitProps = {
  forumMode: boolean, 
  postId: string,
  courseId?: string,
  thumbnail?: string,
  likes: number,
  username: string,
  isLiked: boolean
}

const VideoPostUnit: React.FC<VideoPostUnitProps> = ({
  forumMode,
  postId,
  courseId,
  thumbnail, 
  likes, 
  username,
  isLiked
}
  : VideoPostUnitProps
) => {

  const [user, setUser] = useState('');
    useEffect(() => {
      setUser('');
      loadUser();
    }, []);

  //Establishes router
  const router = useRouter();

  //Establishes session data
  const {data: session, status} = useSession();

  //Establishes owner state
  const [owned, setOwned] = useState<boolean>(false);

  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${username}`);
      if (!response.ok) throw new Error('Failed to fetch user');
  
      const userData = await response.json();
      setUser(userData.username); // Adjust based on what data you return
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }

  //Redirects to the forum
  const redirectToForum = () => {
    router.push(`/course-search/${courseId}/resources/${postId}`);
  };

  //Handles deletion of post and redirection when deleted
  const trashClick = async () => {

    /*
    //Deletes post information
    const deleteResponse = await fetch(`/api/posts/${postId}/delete`, {
      method: 'DELETE',
    });

    await deleteResponse.json();
    */

    //Redirects back as trash btn should only be accessible on the forum side
    router.push(`/course-search/${courseId}/resources`);

  }

  const isUserPostOwner = async () => {

    //Gets user id from session
    const userId = session?.user?.id;

    console.log("Reaches here")

    if (!userId) {
      return false;
    }

    console.log("How about here")

    //Get post object
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'GET',
    });

    const postData = await response.json();
    console.log(postData)

    if (postData.post.user.toString() == userId) {
      return true;
    }
    return false;

  }

  useEffect(() => {
    const configureOwned = async() => {
      const isOwned = await isUserPostOwner();
      setOwned(isOwned);
      console.log(owned);
    }
    console.log(courseId);
    console.log(`/course-search/${courseId}/resources`);
    configureOwned();
  }, [owned])

  return (
    <div className="p-2 w-full max-w-[220px]">
      <button className="block w-full hover:scale-110 transition-transform duration-200" title="Video thumbnail">
        <Image
          title="Video thumbnail"
          src={thumbnail ? thumbnail : "https://picsum.photos/id/5/264/154"}
          alt={'Video thumbnail'}
          width={220}
          height={128}
          className="rounded-[10px]"
          onClick={forumMode ? () => {} : redirectToForum} //If on forum mode, button is unclickable
        />
      </button>
      {
        forumMode ? 
          <div className="flex justify-between items-center mt-2">
            <div className="flex p-[10px] justify-between w-[100px]">
              <LoveBtn likes={likes} likedStatus={isLiked} postId={postId}/>
                {
                  owned && <TrashBtn onclickFunc={trashClick}/> //Renders only if user is the post owner
                }
            </div>
            <div className="p-[10px] pr-[20px]">
              <h4 className="text-white">{username}</h4>
            </div>
          </div>
        : 
          <div className="flex justify-between">
            <div className="flex p-[10px] justify-between w-[100px]">
              <LoveBtn likes={likes} likedStatus={isLiked} postId={postId}/>
            </div>
            <div className="p-[10px] pr-[20px]">
              <h4 className="text-white">{user ? user : "Loading..."}</h4>
            </div>
          </div>
      }
    </div>
  );
};

export default VideoPostUnit;
