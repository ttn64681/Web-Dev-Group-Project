'use client';
import React, { useState, useEffect } from 'react';
import { Heart } from '@phosphor-icons/react';

type LoveBtnProps = {
  likes: number,
  likedStatus: boolean
}

const LoveBtn: React.FC<LoveBtnProps> = ({likes, likedStatus}: LoveBtnProps) => {

  const [liked, setLiked] = useState(likedStatus);
  const [likeNum, setLikeNum] = useState(likes);


  const handleClick = () => {

    //Changes liked status
    setLiked((liked) => !liked);

    liked ? setLikeNum(likeNum => likeNum + 1) :  setLikeNum(likeNum => likeNum - 1);

    //Update likes BELOW
    /*
    
    */
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
