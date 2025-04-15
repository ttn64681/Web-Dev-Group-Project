'use client';
import React, { useState, useEffect } from 'react';
import { Trash } from '@phosphor-icons/react';

const TrashBtn: React.FC = () => {
  return (
    <div>
      <button className="hover:scale-125 transition-transform duration-200">
        <Trash size={24} color="#765178" weight="bold" />
      </button>
    </div>
  );
};

export default TrashBtn;
