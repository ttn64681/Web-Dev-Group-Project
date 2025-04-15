'use client';
import React, { useState } from 'react';
import Item from './Item';

// Items component maps the items out

type ItemType = {
  id: number;
  owner: string;
  title: string;
  desc: string;
  url: string;
};

// onSelectItem prop for handling selection
type ItemsProps = {
  items: ItemType[];
  onSelectItem: (item: ItemType | null) => void;
};

const Items: React.FC<ItemsProps> = ({ items, onSelectItem }) => {
  // NEW: Added state for tracking selected item
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // NEW: Added handler for checkbox changes
  const handleCheckboxChange = (item: ItemType) => {
    if (selectedItem === item.id) {
      setSelectedItem(null);
      onSelectItem(null);
    } else {
      setSelectedItem(item.id);
      onSelectItem(item);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-4 bg-[#33203A] rounded-lg">
          {/* NEW: Added checkbox input */}
          <input
            type="checkbox"
            checked={selectedItem === item.id}
            onChange={() => handleCheckboxChange(item)}
            className="mt-1"
            style={{ transform: 'scale(1.5)' }}
          />
          {/* ORIGINAL: Simple item display without checkbox
          <div className="flex-1">
            <div className="flex gap-4">
              <img src={item.url} alt={item.title} className="w-32 h-32 object-cover rounded-lg" />
              <div>
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-grayish-purple">{item.desc}</p>
                <p className="text-grayish-purple text-sm mt-2">Posted by: {item.owner}</p>
              </div>
            </div>
          </div>
          */}
          {/* NEW: Updated layout with centered checkbox and larger image */}
          <div className="flex items-center justify-center gap-10">
            <div className="flex-1">
              <div className="flex gap-4">
                <img 
                  src={`https://picsum.photos/seed/${item.id}/350/200`} 
                  alt={item.title} 
                  className="w-[350px] h-[200px] object-cover rounded-lg" 
                />
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-grayish-purple">{item.desc}</p>
                  <p className="text-grayish-purple text-sm mt-2">Posted by: {item.owner}</p>
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
