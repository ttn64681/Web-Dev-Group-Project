'use client';
import { UsersThree } from '@phosphor-icons/react';
import Items from './contribute/Items';
import { useState, useEffect } from 'react';
import CourseSearchArea from './course-search/CourseSearchArea';
import { MagnifyingGlass } from '@phosphor-icons/react';

// The contribute component

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
  
  // State for tracking selected item and form input values
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
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
    setSelectedItem(null);
  };
  const showLinks = () => {
    setActiveTab('Links');
    setItems([]); // Clear items when switching to Links
    setSelectedItem(null);
  };
  const showMusic = () => {
    setActiveTab('Music');
    setItems(musicItems);
    setSelectedItem(null);
  };


  // Handle changes to form inputs
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with validation
  // Tracks whether form has been submitted
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form based on active tab
    if (activeTab !== 'Links' && !selectedItem) {
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

    setSubmitted(true);

    // Create post data object
    const postData = {
      postTitle: formData.title,
      postDescription: formData.desc,
      postUrl: formData.url,
      selectedItem: selectedItem ? {
        title: selectedItem.title,
        description: selectedItem.desc,
        url: selectedItem.url
      } : null
    };

    console.log('Post Data:', postData);

    // Reset form and selection
    setFormData({
      title: '',
      desc: '',
      url: '',
    });

    // makes the button usable again after 2 seconds
    setTimeout(() => setSubmitted(false), 2000);

    setSelectedItem(null); // uncheck the selected item
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

        <h1 className="font-dongle font-medium text-6xl sm:text-7xl text-neon-violet drop-shadow-[0_0_10px_rgba(189,17,255,1)]">Contribution</h1>
      </div>

      {/* Container For All Form Elements */}
      <div className="flex flex-col items-center gap-5 pb-10">

        <div className="flex-1 w-5/6 mx-auto h-full">
          <h4 className="font-nunito text-[#D163D7] mb-[10px] text-sm sm:text-base">
            Select one of the existing classes to post a resource to
          </h4>
          <p className="font-nunito text-disabled-purple mb-2 text-sm sm:text-base">Class:</p>

          {/* Course Selection */}
          <div className="border-2 border-neon-violet rounded-lg h-9 sm:h-11">
            <select className="bg-nav-purple rounded-md mr-3 flex-1 w-full h-8 sm:h-10 font-nunito text-base sm:text-lg text-white pl-2 sm:p-2">
              <option>Select course</option>
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
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-5 w-5/6 mx-auto text-white">
          {/* Video/Music Top Container */}
          <div className="bg-component-purple rounded-lg pt-9 pb-5 px-10 -mt-5">
            <p className="pb-4 text-xl sm:text-2xl font-semibold">
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
            {activeTab === 'Links' && (
              <div className="flex justify-center sm:justify-end">
                <button
                  type="submit"
                  className=" p-[5px] pl-[15px] pr-[15px] text-white border-white hover:scale-110 transition-transform duration-200 border-[3px] rounded-[10px] inline"
                >
                  {submitted ? 'Submitted' : 'Submit Post'}
                </button>
              </div>
            )}
          </div>

          {/* Video/Music Bottom Container - Hidden for Links tab */}
          {activeTab !== 'Links' && (
            // flex-1 w-5/6 mx-auto h-full text-white 
            <div className="bg-component-purple rounded-lg py-9 px-10">
              <h2 className="text-white text-xl sm:text-2xl pb-4 font-semibold">
                {activeTab === 'Videos' ? 'Search Videos' : 'Search Music'}
              </h2>
              <div className="grow">
                <div className="flex h-8 sm:h-10">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-[5px] w-full bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40 outline-none"
                  />
                  <button className="px-[5px] sm:p-[5px] bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-r-[10px]">
                    <MagnifyingGlass size={24} className="align-middle" color="white" />
                  </button>
                </div>
              </div>
              <h4 className="mt-6 sm:mt-10 text-sm sm:text-base text-[#EFDEF0]">
                {activeTab === 'Videos' ? 'Select a video:' : 'Select a song'}
              </h4>

              <Items items={items} selectedItem={selectedItem} onSelectItem={setSelectedItem} />
              <div className="flex justify-center sm:justify-end">
                <button
                  type="submit"
                  disabled={submitted}
                  className={`mt-3 sm:m-0 p-[5px] pl-[15px] pr-[15px] border-white border-[3px] rounded-[10px] transition-transform duration-200 text-white  inline ${submitted ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                  {submitted ? 'Submitted' : 'Submit Post'}
                </button>
              </div>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};

export default Contribute;
