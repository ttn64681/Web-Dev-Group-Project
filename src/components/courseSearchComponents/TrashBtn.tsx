"use client";
import React, { useState, useEffect } from "react";
import { Trash } from "@phosphor-icons/react";

const TrashBtn: React.FC = () => {
    return (
        <div>
            <div>
                <Trash size={6} />
            </div>
        </div>
    );
}

export default TrashBtn;