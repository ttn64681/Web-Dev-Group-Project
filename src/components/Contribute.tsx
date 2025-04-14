"use client";
import { UsersThree } from "@phosphor-icons/react";
import Items from "./Items";
import { useState, useEffect } from "react";
import CourseSearchArea from "./courseSearchComponents/CourseSearchArea";
import { MagnifyingGlass } from "@phosphor-icons/react";

// The contribute component

type ItemType = {
  id: number;
  owner: string;
  title: string;
  desc: string;
  url: string;
}


const linkItems: ItemType[] = [
  {
    id: 1,
    owner: 'user_one',
    title: 'study tool one',
    desc: 'This is a usefull study tool that I used all the time during class, I do not think you can do without it!',
    url: 'https://quizlet.com/latest#',
  },
  {
    id: 2,
    owner: 'user_two',
    title: 'A different Study Tool',
    desc: 'I really love studying and you will too after using this awesome tool',
    url: 'https://quizlet.com/latest#',
  },
  {
    id: 3,
    owner: 'user_three',
    title: 'study tool 3',
    desc: 'This is a usefull study tool that I used all the time during class, I do not think you can do without it!',
    url: 'https://quizlet.com/latest#',
  },
];

const videoItems: ItemType[] = [
  {
    id: 1,
    owner: 'user_one',
    title: 'Helpful video',
    desc: 'This video helped me a lot',
    url: 'https://www.youtube.com/',
  },
  {
    id: 2,
    owner: 'user_two',
    title: 'Another helpful video',
    desc: 'I wouldnt have passed the final without this one!',
    url: 'https://www.youtube.com/',
  },
  {
    id: 3,
    owner: 'user_three',
    title: 'My favorite video',
    desc: 'I just love this video',
    url: 'https://www.youtube.com/',
  },
];

const musicItems: ItemType[] = [
  {
    id: 1,
    owner: 'user_one',
    title: 'Music suggestion',
    desc: 'This song really helps me study',
    url: 'https://music.youtube.com/',
  },
  {
    id: 2,
    owner: 'user_two',
    title: 'Music playlist',
    desc: 'This playlist got me through the midterm',
    url: 'https://music.youtube.com/',
  },
  {
    id: 3,
    owner: 'user_three',
    title: 'Lofi',
    desc: 'Love this playlist',
    url: 'https://music.youtube.com/',
  },
];

const Contribute: React.FC = () => {
  // TODO: Add state management
  // TODO: Implement YouTube API
  // TODO: Add MongoDB integration
  // TODO: Style the component
  // TODO: Add error handling
  // TODO: Add loading states
  // TODO: Handle authentication

  const [activeTab, setActiveTab] = useState('Videos');
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    showVideos();
    return () => {
    };
  }, []);

  const showVideos = () => {
    setActiveTab('Videos');
    setItems(videoItems);
  }
  const showLinks = () => {
    setActiveTab('Links');
    setItems(linkItems);
  }
  const showMusic = () => {
    setActiveTab('Music');
    setItems(musicItems);
  }


  return (
    <div>
      <div className="flex flex-row justify-center items-center flex-wrap items-center gap-5">
        <div className="flex flex-col-row items-center">
          <div>
            <UsersThree className="text-neon-violet" size={85} />
          </div>
        </div>
        <h1 className="font-dongle text-5xl font-extrabold text-neon-violet">
          Contribution
        </h1>
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="flex-1 w-5/6 mx-auto h-full">
          <p className="text-neon-pink mb-2">Class:</p>
          <div className="border-2 border-neon-violet rounded-lg">
            <select className="bg-nav-purple rounded-md font-semibold mr-3 flex-1 w-full h-10 text-white p-2">
              <option>Select course</option>
            </select>
            {/*<input type="text" placeholder="Title" className="bg-nav-purple outline-none text-white flex-1 w-5/6 mx-auto h-10" />*/}
          </div>
          <div className="pt-2 pb-2">
            <button onClick={showVideos} className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === "Videos" ? "bg-[#301936] text-[#F88AFF] border-[#F88AFF]" : "text-white border-white"} hover:scale-110 transition-transform duration-200 border border-[3px] rounded-[10px] inline`}>
              Videos
            </button>
            <button onClick={showLinks} className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === "Links" ? "bg-[#301936] text-[#F88AFF] border-[#F88AFF]" : "text-white border-white"} hover:scale-110 transition-transform duration-200 border border-[3px] rounded-[10px] inline`}>
              Links
            </button>
            <button onClick={showMusic} className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === "Music" ? "bg-[#301936] text-[#F88AFF] border-[#F88AFF]" : "text-white border-white"} hover:scale-110 transition-transform duration-200 border border-[3px] rounded-[10px] inline`}>
              Music
            </button>
          </div>
        </div>
        <div className="bg-component-purple rounded-lg flex-1 w-5/6 mx-auto h-full text-white pt-5 pb-5">
          <div className="pb-4 pl-5">
            <p className="pb-2"> {activeTab !== "Videos" ? "" : "Enter Video Details"} {activeTab !== "Links" ? "" : "Enter Post Details"} {activeTab !== "Music" ? "" : "Enter Music Details"}</p>
            <input type="text" placeholder="Title" className=" bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-5/6 mx-auto h-full border-2 border-form-pink-border rounded-md p-2" />
          </div>
          <div className="flex-1 mx-auto h-40 pl-5">
            <textarea placeholder="Description" className=" bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-5/6 mx-auto h-full border-2 border-form-pink-border rounded-md p-2 text-justify" />
          </div>
          <div className="pl-3 pt-5">
            <button className={`m-[10px] p-[5px] pl-[15px] pr-[15px] text-white border-white" hover:scale-110 transition-transform duration-200 border border-[3px] rounded-[10px] inline`}>
              Submit
            </button>
          </div>
        </div>
        <div className="bg-component-purple rounded-lg flex-1 w-5/6 mx-auto h-full text-white p-4">
          <h2 className="text-white text-[30px]"> {activeTab !== "Videos" ? "" : "Search Videos"} {activeTab !== "Links" ? "" : "Search Posts"} {activeTab !== "Music" ? "" : "Search Music"} </h2>
          <div className="ml-[10px] mr-[10px] grow">
            <div className="flex max-w-[500px]">
              <input type="text" placeholder="Search" className="p-[5px] w-[400px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40 outline-none" />
              <button className="p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]">
                <MagnifyingGlass size={24} className="align-middle" color="white" />
              </button>
            </div>
          </div>
          <Items items={items} />
        </div>
      </div>
    </div>
  );
};

export default Contribute;
