'use client';
import React, { useState, useEffect } from 'react';

type TopicMiniboxProps = {
  topicText: string
}

const TopicMinibox: React.FC<TopicMiniboxProps> = ({
  topicText
}: TopicMiniboxProps) => {
  return (
    <div>
      <div className="my-1">
        <h3 className="p-[5px] px-[15px] text-white border border-white rounded-[10px] inline">
          {topicText}
        </h3>
      </div>
    </div>
  );
};

export default TopicMinibox;
