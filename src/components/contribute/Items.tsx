'use client';
import React, { useState, useEffect } from 'react';
// import Item from './Item';

// Items component maps the items out

type ItemType = {
  id: number;
  owner: string;
  title: string;
  desc: string;
  url: string;
  thumbnail?: string; // Add thumbnail URL
  date: string;
  channel: string;
  duration: number;
  views: number;
  likes: number;
};

// onSelectItem prop for handling selection
type ItemsProps = {
  items: ItemType[];
  onSelectItem: (item: ItemType | null) => void;
};

const Items: React.FC<ItemsProps> = ({ items, onSelectItem }) => {
  // State for tracking selected item
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  // Handler for checkbox changes
  const handleCheckboxChange = (item: ItemType) => {
    if (selectedItem === item) {
      // if already checked, uncheck
      setSelectedItem(null);
      onSelectItem(null);
    } else {
      setSelectedItem(item);
      onSelectItem(item);
    }
  };

  // redirect to the item's url
  const handleItemClick = (item: ItemType) => {
    window.open(item.url, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 mt-4 -ml-4 mt-8">
      {/* Maps out the items by date*/}
      {items.map((item) => (
        <div
          key={item.date}
          className="flex items-center p-4 pl-2 bg-[#33203A] rounded-lg hover:bg-white/5 transition-all duration-200 ml-4"
        >
          {/* Checkbox container */}
          <div className="flex items-center justify-center w-12 mr-2">
            <input
              type="checkbox"
              checked={selectedItem === item}
              onChange={() => handleCheckboxChange(item)}
              className="scale-150"
              title={`Select ${item.title}`}
            />
          </div>

          {/* Content container with responsive layout */}
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            <button className="flex-shrink-0" onClick={() => handleItemClick(item)}>
              <img
                src={item.thumbnail || `https://picsum.photos/seed/${item.id}/350/200`}
                alt={item.title}
                className="w-full md:w-[350px] max-h-[200px] min-h-[80px] min-w-[200px] object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to placeholder if thumbnail fails to load
                  (e.target as HTMLImageElement).src =
                    `https://picsum.photos/seed/${item.id}/350/200`;
                }}
              />
            </button>
            <div className="flex-1">
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-grayish-purple">{item.desc}</p>
              <p className="text-grayish-purple text-sm mt-2">URL: {item.url}</p>
              <p className="text-grayish-purple text-sm mt-2">Date Posted: {item.date}</p>
              <p className="text-grayish-purple text-sm mt-2">Channel: {item.channel}</p>
              <p className="text-grayish-purple text-sm mt-2">Duration: {item.duration}</p>
              <p className="text-grayish-purple text-sm mt-2">Views: {item.views}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
