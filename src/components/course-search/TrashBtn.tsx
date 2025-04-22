'use client';
import React, { useState, useEffect } from 'react';
import { Trash } from '@phosphor-icons/react';

type TrashBtnProps = {
  onclickFunc: () => void
}

const TrashBtn: React.FC<TrashBtnProps> = ({
  onclickFunc
}: TrashBtnProps
) => {
  return (
    <div>
      <button className="hover:scale-125 transition-transform duration-200" onClick={onclickFunc}>
        <Trash size={24} color="#765178" weight="bold" />
      </button>
    </div>
  );
};

export default TrashBtn;
