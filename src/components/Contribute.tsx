'use client';
import { UsersThree } from '@phosphor-icons/react';
import Items from './contribute/Items';
import { useState, useEffect } from 'react';
import CourseSearchArea from './course-search/CourseSearchArea';
import { MagnifyingGlass } from '@phosphor-icons/react';
import connectMongoDB from '../../config/mongodb';

// The contribute component

/**
 * Searches YouTube videos based on a query
 * @param query - Search query string
 * @param maxResults - Maximum number of results to return (default: 20)
 * @returns Object containing success status and either the videos or an error message
 */
async function searchYouTubeVideos(query: string, maxResults: number = 20) {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YOUTUBE_API_KEY) {
      return { success: false, error: 'YouTube API key not configured' };
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }

    const data = await response.json();
    
    // Transform the YouTube API response into our post format 
    const videos = data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      videoId: item.id.videoId, // Store videoId separately for embedding
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      postType: 'youtube' as const,
      // Note: course and user will be added when creating the post
    }));

    return { success: true, videos };
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return { success: false, error: 'Failed to search YouTube videos' };
  }
}

type ItemType = {
  id: number;
  owner: string;
  title: string;
  desc: string;
  url: string;
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
  const [items, setItems] = useState<ItemType[]>([]); // set searched items

  // State for tracking selected YT video and form input values
  const [selectedVideo, setSelectedVideo] = useState<ItemType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    url: '',
  });

  // Initialize with videos when component mounts
  useEffect(() => {
    showVideos();
  }, []);

  // Functions to switch between tabs and update items list
  const showVideos = () => {
    setActiveTab('Videos');
    setItems(videoItems);
    setSelectedVideo(null);
  };
  const showLinks = () => {
    setActiveTab('Links');
    setItems([]); // Clear items when switching to Links
    setSelectedVideo(null);
  };
  const showMusic = () => {
    setActiveTab('Music');
    setItems(musicItems);
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

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
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

    // Create post data object
    const postData = {
      postTitle: formData.title,
      postDescription: formData.desc,
      postUrl: formData.url,
      selectedVideo: selectedVideo
        ? {
            title: selectedVideo.title,
            description: selectedVideo.desc,
            url: selectedVideo.url,
          }
        : null,
    };

    console.log('Post Data:', postData);

    // Reset form and selection
    setFormData({
      title: '',
      desc: '',
      url: '',
    });
    setSelectedVideo(null); // uncheck the selected video
  };

  return (
    <div>
      {/* Contribution Title */}
      <div className="flex flex-row justify-center items-center flex-wrap gap-5">
        <div className="flex flex-col-row items-center">
          <div>
            <UsersThree className="text-neon-violet" size={85} />
          </div>
        </div>

        <h1 className="font-dongle text-5xl font-extrabold text-neon-violet">Contribution</h1>
      </div>

      {/* Container For All Form Elements */}
      <div className="flex flex-col items-center gap-10">
        <div className="flex-1 w-5/6 mx-auto h-full">
          <p className="text-neon-pink mb-2">Class:</p>

          {/* Course Selection */}
          <div className="border-2 border-neon-violet rounded-lg">
            <select className="bg-nav-purple rounded-md font-semibold mr-3 flex-1 w-full h-10 text-white p-2">
              <option>Select course</option>
            </select>
            {/*<input type="text" placeholder="Title" className="bg-nav-purple outline-none text-white flex-1 w-5/6 mx-auto h-10" />*/}
          </div>

          {/* Contribution Type Selection */}
          <div className="pt-2 pb-2">
            <button
              onClick={showVideos}
              className={`m-[10px] ml-0 p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Videos' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border border-[2px] rounded-[10px] inline`}
            >
              Videos
            </button>
            <button
              onClick={showLinks}
              className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Links' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border border-[2px] rounded-[10px] inline`}
            >
              Links
            </button>
            <button
              onClick={showMusic}
              className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Music' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border border-[2px] rounded-[10px] inline`}
            >
              Music
            </button>
          </div>
        </div>

        {/* Post Form */}
        <div className="bg-component-purple rounded-lg flex-1 w-5/6 mx-auto h-full text-white pt-5 pb-5 -mt-5">
          <form onSubmit={handleSubmit} className="pb-4 pl-5">
            <p className="pb-2">
              {activeTab === 'Videos' && 'Enter Video Details'}
              {activeTab === 'Links' && 'Enter Post Details'}
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
                  className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-5/6 mx-auto h-full border-2 border-form-pink-border rounded-md p-2 mb-2"
                />
              </div>
            )}

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-5/6 mx-auto h-full border-2 border-form-pink-border rounded-md p-2 mb-4"
            />

            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleFormChange}
              placeholder="Description"
              className="bg-form-pink bg-opacity-10 outline-none text-white flex-1 w-5/6 mx-auto h-full border-2 border-form-pink-border rounded-md p-2 text-justify mb-4"
            />

            <div className="flex justify-start">
              <button
                type="submit"
                className="p-[5px] pl-[15px] pr-[15px] text-white border-white hover:scale-110 transition-transform duration-200 border border-[3px] rounded-[10px] inline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Search Container - Hidden for Links tab */}
        {activeTab !== 'Links' && (
          <div className="bg-component-purple rounded-lg flex-1 w-5/6 mx-auto h-full text-white p-4">
            <h2 className="text-white text-[30px]">
              {' '}
              {activeTab === 'Videos' ? 'Search Videos' : 'Search Music'}
            </h2>
            <div className="ml-[10px] mr-[10px] grow">
              <div className="flex max-w-[500px]">
                <input
                  type="text"
                  placeholder="YouTube Search"
                  className="p-[5px] w-[400px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40 outline-none"
                />
                <button className="p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]">
                  <MagnifyingGlass size={24} className="align-middle" color="white" />
                </button>
              </div>
            </div>
            <Items items={items} onSelectItem={setSelectedVideo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contribute;
