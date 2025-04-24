'use client';
import React, { useState, useEffect } from 'react';
import { Heart } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';

type LoveBtnProps = {
  likes: number;
  likedStatus: boolean;
  postId: string;
};

const LoveBtn: React.FC<LoveBtnProps> = ({ likes, likedStatus, postId }: LoveBtnProps) => {
  const [liked, setLiked] = useState<boolean>(likedStatus);
  const [likeNum, setLikeNum] = useState(likes);

  const { data: session, status } = useSession();

  useEffect(() => {
    setLiked(likedStatus);
  }, [likedStatus]);

  const handleClick = async () => {
    const user = session?.user?.id;
    if (!user) {
      alert('Please login to add a comment.');
      return;
    }

    //Changes liked status
    setLiked((liked) => !liked);

    // JR YOU FLIPPED THE LOGIC, it should be:
    // if not liked, like
    // if liked, unlike
    // HEARD KING

    //Updates like numbers by +1
    if (!liked) {
      //LOCAL CHANGE
      setLikeNum((likeNum) => likeNum + 1);

      //GLOBAL CHANGE
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      });
      await response.json();
    } else {
      // Updates like numbers by -1 unless likeNum === 0
      if (likeNum > 0) {
        //LOCAL CHANGE
        setLikeNum((likeNum) => likeNum - 1);

        //GLOBAL CHANGE
        const response = await fetch(`/api/posts/${postId}/unlike`, {
          method: 'DELETE',
        });
        await response.json();
      }
    }
  };

  useEffect(() => {
    console.log('Love btn postRender-liked: ', likedStatus);
    setLiked(likedStatus);
  }, []);

  return (
    <div>
      <div className="flex content-center">
        <button onClick={handleClick} title={liked ? 'Unlike' : 'Like'}>
          <Heart
            size={24}
            color="#B3B3B3"
            className="mr-[3px] hover:scale-125 transition-transform duration-200"
            weight={`${liked ? 'fill' : 'bold'}`}
          />
        </button>
        <h3 className="text-white font-bold">{likeNum}</h3>
      </div>
    </div>
  );
};

export default LoveBtn;
