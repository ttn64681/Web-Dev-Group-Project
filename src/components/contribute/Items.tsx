'use client';
import React, { useState, useEffect } from 'react';
import Item from './Item';

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
};

// onSelectItem prop for handling selection
type ItemsProps = {
  items: ItemType[];
  onSelectItem: (item: ItemType | null) => void;
};

const Items: React.FC<ItemsProps> = ({ items, onSelectItem }) => {
  // State for tracking selected item
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Handler for checkbox changes
  const handleCheckboxChange = (item: ItemType) => {
    if (selectedItem === item.id) {
      // if already checked, uncheck
      setSelectedItem(null);
      onSelectItem(null);
    } else {
      setSelectedItem(item.id);
      onSelectItem(item);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Maps out the items*/}
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-4 bg-[#33203A] rounded-lg">
          {/* Added checkbox input */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItem === item.id}
              onChange={() => handleCheckboxChange(item)}
              className="mt-1 scale-150"
              title={`Select ${item.title}`}
            />
          </label>

          {/* Updated layout with centered checkbox and larger image */}
          <div className="flex items-center justify-center gap-10">
            <div className="flex-1">
              <div className="flex gap-4">
                <img
                  src={item.thumbnail || `https://picsum.photos/seed/${item.id}/350/200`}
                  alt={item.title}
                  className="min-w-[350px] max-w-[350px] min-h-[200px] max-h-[200px]  object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to placeholder if thumbnail fails to load
                    (e.target as HTMLImageElement).src =
                      `https://picsum.photos/seed/${item.id}/350/200`;
                  }}
                />
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-grayish-purple">{item.desc}</p>
                  <p className="text-grayish-purple text-sm mt-2">URL: {item.url}</p>
                  <p className="text-grayish-purple text-sm mt-2"> Date Posted: {item.date}</p>
                  <p className="text-grayish-purple text-sm mt-2"> Channel: {item.channel} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
