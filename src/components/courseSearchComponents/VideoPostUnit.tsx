"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoveBtn from "./LoveBtn";
import TrashBtn from "./TrashBtn";

const VideoPostUnit: React.FC = () => {
    return (
        <div>
            <div>
                {/*<Image src={"Filler src"} alt={"Video thumbnail"} width={144} height={108} />*/}

                <div>
                    <div>
                        <LoveBtn />
                        <TrashBtn />
                    </div>
                    <div>
                        <h4>user123</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPostUnit;