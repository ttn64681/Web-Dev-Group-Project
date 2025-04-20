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
      <div>
        <h3 className="ml-[5px] mr-[5px] p-[5px] pl-[15px] pr-[15px] text-white border border-white rounded-[10px] inline">
          {topicText}
        </h3>
      </div>
    </div>
  );
};

export default TopicMinibox;
