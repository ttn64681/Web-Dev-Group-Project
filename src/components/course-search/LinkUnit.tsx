'use client';
import React, { useState, useEffect } from 'react';

type LinkUnitProps = {
  number: number
  link: string,
  description: string
}

const LinkUnit: React.FC<LinkUnitProps> = ({number, link, description}: LinkUnitProps) => {
  return (
    <div>
      <div>
        <h3 className="text-[#E2D0E6] p-[2px]"> {number}) {link}</h3>
        <h4 className="text-[#E2D0E6] p-[2px]">{description}</h4>
      </div>
    </div>
  );
};

export default LinkUnit;
