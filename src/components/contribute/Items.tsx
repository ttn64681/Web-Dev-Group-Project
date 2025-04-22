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
  selectedItem: ItemType | null;
  onSelectItem: (item: ItemType | null) => void;
};

const Items: React.FC<ItemsProps> = ({ items, selectedItem, onSelectItem }) => {
  // Handler for checkbox changes
  const handleCheckboxChange = (item: ItemType) => {
    if (selectedItem?.id === item.id) { // if already checked, uncheck
      onSelectItem(null);
    } else {
      onSelectItem(item);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          isSelected={selectedItem?.id === item.id}
          onSelectItem={() => handleCheckboxChange(item)}
        />
      ))}
    </div>
  );
};

export default Items;
