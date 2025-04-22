'use client';
import React, { useState, useEffect } from 'react';
import { Heart } from '@phosphor-icons/react';

type LoveBtnProps = {
  likes: number,
  likedStatus: boolean,
  postId: string
}

const LoveBtn: React.FC<LoveBtnProps> = ({likes, likedStatus, postId}: LoveBtnProps) => {

  const [liked, setLiked] = useState(likedStatus);
  const [likeNum, setLikeNum] = useState(likes);


  const handleClick = async () => {

    //Changes liked status
    setLiked((liked) => !liked);

    //Updates like numbers by 1
    if (liked) {

      //LOCAL CHANGE
      setLikeNum(likeNum => likeNum + 1);

      //GLOBAL CHANGE
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'DELETE'
      })
      await response.json()
      
    } 
    //Updates like numbers down by 1
    else {

      //LOCAL CHANGE
      setLikeNum(likeNum => likeNum - 1);

      //GLOBAL CHANGE
      const response = await fetch(`/api/posts/${postId}/unlike`, {
        method: 'DELETE'
      })
      await response.json();
    }

  };

  return (
    <div>
      <div className="flex content-center">
        <button onClick={handleClick}>
          <Heart
            size={24}
            color="#B3B3B3"
            className="mr-[3px] hover:scale-125 transition-transform duration-200"
            weight={`${liked ? 'fill' : 'bold'}`}
          />
        </button>
        <h3 className="text-white font-bold">{likes}</h3>
      </div>
    </div>
  );
};

export default LoveBtn;
