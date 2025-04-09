"use client";
import React, { useState, useEffect } from "react";
import { Heart } from "@phosphor-icons/react";

const LoveBtn: React.FC = () => {
    return (
        <div>
            <div>
                <Heart size={24}/>
                <h3>#</h3>
            </div>
        </div>
    );
}

export default LoveBtn;