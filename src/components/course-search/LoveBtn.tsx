'use client';
import React, { useState, useEffect } from 'react';
import { Heart } from '@phosphor-icons/react';

const LoveBtn: React.FC = () => {
  const [loved, setLoved] = useState(false);

  const handleClick = () => {
    setLoved((loved) => !loved);
  };

  return (
    <div>
      <div className="flex content-center">
        <button onClick={handleClick}>
          <Heart
            size={24}
            color="#B3B3B3"
            className="mr-[3px] hover:scale-125 transition-transform duration-200"
            weight={`${loved ? 'fill' : 'bold'}`}
          />
        </button>
        <h3 className="text-white font-bold">#</h3>
      </div>
    </div>
  );
};

export default LoveBtn;
