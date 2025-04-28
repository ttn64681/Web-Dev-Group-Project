'use client';
import { UsersThree } from '@phosphor-icons/react';
import Items from './contribute/Items';
import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import connectMongoDB from '../../config/mongodb';
import { useSession } from 'next-auth/react';

// The contribute component

/**
 * Searches YouTube videos based on a query
 * @param query - Search query string
 * @param maxResults - Maximum number of results to return (default: 20)
 * @returns Object containing success status and either the videos or an error message
 */

type ItemType = {
  id: number;
  owner: string;
  title: string;
  desc: string;
  url: string;
  date: string;
  channel: string;
  thumbnail?: string;
  duration: number;
  views: number;
  likes: number;
};

type CourseType = {
  title: string;
  courseId: string;
};

// const linkItems: ItemType[] = [
//   {
//     id: 1,
//     owner: 'user_one',
//     title: 'study tool one',
//     desc: 'This is a usefull study tool that I used all the time during class, I do not think you can do without it!',
//     url: 'https://quizlet.com/latest#',
//   },
//   {
//     id: 2,
//     owner: 'user_two',
//     title: 'A different Study Tool',
//     desc: 'I really love studying and you will too after using this awesome tool',
//     url: 'https://quizlet.com/latest#',
//   },
//   {
//     id: 3,
//     owner: 'user_three',
//     title: 'study tool 3',
//     desc: 'This is a usefull study tool that I used all the time during class, I do not think you can do without it!',
//     url: 'https://quizlet.com/latest#',
//   },
// ];

const Contribute: React.FC = () => {
  // TODO: Add state management
  // TODO: Implement YouTube API
  // TODO: Add MongoDB integration
  // TODO: Style the component
  // TODO: Add error handling
  // TODO: Add loading states
  // TODO: Handle authentication

  const [activeTab, setActiveTab] = useState('Videos');
  const [items, setItems] = useState<ItemType[]>([]); // set searched items
  const [courses, setCourses] = useState<CourseType[]>([]); // set courses for search bar
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const { data: session, status } = useSession(); ////////////////////////////////////////////////////////////// USE SESSIOn

  // State for tracking selected YT video and form input values
  const [selectedVideo, setSelectedVideo] = useState<ItemType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    url: '',
  });

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with videos when component mounts
  useEffect(() => {
    connectMongoDB();
    showVideos();
    fetchCourses();
  }, []);

  // Functions to switch between tabs and update items list
  const showVideos = () => {
    setActiveTab('Videos');
    //setItems();
    setSelectedVideo(null);
  };
  const showLinks = () => {
    setActiveTab('Links');
    setItems([]); // Clear items when switching to Links
    setSelectedVideo(null);
  };
  const showMusic = () => {
    setActiveTab('Music');
    //setItems();
    setSelectedVideo(null);
  };

  // Handle changes to form inputs
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  // Handle form submission with validation
  // Tracks whether form has been submitted
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form based on active tab
    if (activeTab !== 'Links' && !selectedVideo) {
      alert('Please select a video');
      return;
    }

    if (!formData.title || !formData.desc) {
      alert('Please fill out all required fields');
      return;
    }

    if (activeTab === 'Links' && !formData.url) {
      alert('Please enter a URL');
      return;
    }

    if (selectedCourse === '' || selectedCourse === 'default') {
      alert('Please enter a course');
      return;
    }

    //Construct thumbnail
    let thumbnail = null;
    if (formData.url.length >= 24 && formData.url.substring(0, 24) == 'https://www.youtube.com') {
      const url = new URL(formData.url);
      const urlParams = new URLSearchParams(url.search);
      const videoId = urlParams.get('v');
      thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      thumbnail = '/logo/LinkItemLogo.png';
    }

    //Determine type
    let selectedType = 'youtube';
    if (activeTab == 'Links') {
      selectedType = 'link';
    }
    if (activeTab == 'Music') {
      selectedType = 'music';
    }
    //setSubmitted(true);

    var postData = {
      postTitle: formData.title,
      postDescription: formData.desc,
      postUrl: selectedVideo?.url,
      postThumbnail: selectedVideo?.thumbnail,
      postType: selectedType,
      courseId: selectedCourse,
      /*
      selectedVideo: selectedVideo
        ? {
          title: selectedVideo.title,
          description: selectedVideo.desc,
          url: selectedVideo.url,
        }
        : null,
      */
    };
    if (selectedType == 'link') {
      postData = {
        postTitle: formData.title,
        postDescription: formData.desc,
        postUrl: formData.url,
        postThumbnail: selectedVideo?.thumbnail,
        postType: selectedType,
        courseId: selectedCourse,
        /*
        selectedVideo: selectedVideo
          ? {
            title: selectedVideo.title,
            description: selectedVideo.desc,
            url: selectedVideo.url,
          }
          : null,
        */
      };
    }

    const userId = session?.user?.id;
    const username = session?.user?.username;

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify({
        title: postData.postTitle,
        description: postData.postDescription,
        url: postData.postUrl,
        thumbnail: postData.postThumbnail,
        postType: postData.postType,
        courseId: postData.courseId,
        userId: userId,
        username: username,
      }),
    });

    const responseMsg = await response.json();

    console.log(responseMsg.success);
    console.log(responseMsg.failure);

    if (activeTab == 'Links') {
      console.log('The selected course is: ', selectedCourse);
      console.log('The Link title is: \n', postData.postTitle);
      console.log('The Link description is: \n', postData.postDescription);
      console.log('The Link url is: \n', postData.postUrl);
    }

    if (activeTab == 'Videos') {
      console.log('The selected course is: ', selectedCourse);
      console.log('The Video Posts title is: \n', postData.postTitle);
      console.log('The Video Posts description is: \n', postData.postDescription);
      console.log('The Videos url is: \n', selectedVideo?.url);
      console.log('The Videos thumbnail url is: \n', selectedVideo?.thumbnail);
    }

    if (activeTab == 'Music') {
      console.log('The selected course is: ', selectedCourse);
      console.log('The Music Posts title is: \n', postData.postTitle);
      console.log('The Music Posts description is: \n', postData.postDescription);
      console.log('The Music url is: \n', selectedVideo?.url);
      console.log('The Music thumbnail url is: \n', selectedVideo?.thumbnail);
    }

    setSubmitted(true);

    // Reset form and selection
    setFormData({
      title: '',
      desc: '',
      url: '',
    });

    //Alert user
    alert('Post was successfully created!');
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/courses`);
      const data = await response.json();

      if (data.success) {
        setCourses(data.courses);
      } else {
        console.log('There was an error retrieving courses');
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const searchYouTubeVideos = async (query: string) => {
    try {
      const response = await fetch(`/api/youtube?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setItems(data.videos);
      } else {
        console.error(data.error);
        alert('Internal Server Error 505:\nFailed to fetch videos');
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      alert('Internal Server Error 505:\nFailed to fetch videos');
    }

    // makes the button usable again after 2 seconds
    setTimeout(() => setSubmitted(false), 2000);

    setSelectedVideo(null); // uncheck the selected item
  };

  return (
    <div className="">
      {/* Contribution Title */}
      <div className="flex flex-row justify-center items-start flex-wrap gap-3 sm:gap-5 mt-[30px] pt-5 pb-10">
        <div className="flex flex-col-row items-center">
          <div className="">
            <UsersThree
              color="#BD11FF"
              className="drop-shadow-[0_0_10px_rgba(189,17,255,1)] -mt-2 w-14 h-14 sm:w-16 sm:h-16"
            />
          </div>
        </div>

        <h1 className="font-dongle font-medium text-6xl sm:text-7xl text-neon-violet drop-shadow-[0_0_10px_rgba(189,17,255,1)]">
          Contribution
        </h1>
      </div>

      {/* Container For All Form Elements */}
      <div className="flex flex-col items-center gap-5 pb-10">
        <div className="flex-1 w-5/6 mx-auto h-full">
          <h4 className="font-nunito text-[#D163D7] text-sm sm:text-base mb-[10px] ">
            Select one of the existing classes to post a resource to
          </h4>
          <p className="font-nunito text-disabled-purple mb-2 text-sm sm:text-base">Class:</p>

          {/* Course Selection */}
          <div className="border-2 border-neon-violet rounded-lg h-9 sm:h-11">
            <select
              className="bg-nav-purple rounded-md mr-3 flex-1 w-full h-8 sm:h-10 font-nunito text-base sm:text-lg text-white pl-2 sm:p-2"
              aria-label="Select a course"
              onChange={handleOnChange}
            >
              {courses.map((course, index) => (
                <option key={index} value={course.courseId}>
                  {course.title}
                </option>
              ))}
              <option value="default">Select course</option>
            </select>
            {/*<input type="text" placeholder="Title" className="bg-nav-purple outline-none text-white flex-1 w-5/6 mx-auto h-10" />*/}
          </div>

          {/* Contribution Type Selection */}
          <div className="pt-2 pb-2">
            <button
              onClick={showVideos}
              className={`m-[10px] ml-0 p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Videos' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[10px] inline`}
            >
              Videos
            </button>
            <button
              onClick={showLinks}
              className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Links' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[10px] inline`}
            >
              Links
            </button>
            <button
              onClick={showMusic}
              className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Music' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[10px] inline`}
            >
              Music
            </button>
          </div>
        </div>

        {/* Post Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full gap-5 w-5/6 mx-auto text-white"
        >
          {/* Video/Music Top Container */}
          <div className="bg-component-purple rounded-lg pt-9 pb-5 px-10 -mt-5">
            <p className="pb-4 text-xl sm:text-2xl font-semibold">
              {activeTab === 'Videos' && 'Enter Video Details'}
              {activeTab === 'Links' && 'Enter Link Details'}
              {activeTab === 'Music' && 'Enter Music Details'}
            </p>

            {/* URL Input Field - Only shown for Links tab */}
            {activeTab === 'Links' && (
              <div className="mb-4">
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleFormChange}
                  placeholder="Enter URL"
                  className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-full mx-auto h-full border-2 border-form-pink-border rounded-md p-2"
                  required
                />
              </div>
            )}

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-full h-9 sm:h-11 border-2 border-form-pink-border rounded-md p-2 mx-auto mb-4"
              required
            />

            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleFormChange}
              placeholder="Description"
              className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-full mx-auto h-24 border-2 border-form-pink-border rounded-md p-2 text-justify mb-4"
              required
            />
            <div className="flex justify-center sm:justify-end">
              <button
                type="submit"
                className=" p-[5px] pl-[15px] pr-[15px] text-white border-white hover:bg-white hover:text-black hover:scale-105 hover:font-bold transition-all duration-200 border-[3px] rounded-[10px] inline"
                onMouseEnter={() => setSubmitted(false)}
              >
                {submitted ? 'Submitted' : 'Submit Post'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Container - Hidden for Links tab */}
      {activeTab !== 'Links' && (
        <div className="bg-component-purple rounded-lg flex-1 w-5/6 mx-auto h-full text-white p-4 mb-10">
          <h2 className="text-white pb-3 ml-6 font-inter font-semibold text-[30px]">
            {' '}
            {activeTab === 'Videos' ? 'Search Videos' : 'Search Music'}
          </h2>
          <div className="ml-[10px] mr-[10px] grow">
            <div className="flex max-w-[500px]">
              <input
                title="YouTube Search Bar"
                type="text"
                placeholder={activeTab === 'Videos' ? 'YouTube Search' : 'Music Search'}
                className="p-[5px] ml-4 w-[400px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40 outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="p-[7px] bg-[#33203A] border-[2px] border-l-0 border-[#6CFEFE] rounded-r-[10px]"
                onClick={() => searchYouTubeVideos(searchInput)}
                title="Search YouTube videos"
              >
                <MagnifyingGlass
                  size={24}
                  className="align-middle group-hover:scale-110 transition-transform duration-200"
                  color="white"
                />
              </button>
            </div>
          </div>
          <Items items={items} onSelectItem={setSelectedVideo} />
        </div>
      )}
    </div>
  );
};

export default Contribute;
