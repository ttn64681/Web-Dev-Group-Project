"use client";
import { UsersThree } from "@phosphor-icons/react";

const Contribute: React.FC = () => {
  // TODO: Add state management
  // TODO: Implement YouTube API
  // TODO: Add MongoDB integration
  // TODO: Style the component
  // TODO: Add error handling
  // TODO: Add loading states
  // TODO: Handle authentication

  return (
    <div>
      <div className="flex flex-row justify-center items-center flex-wrap items-center gap-12">
        <div className="flex flex-col-row items-center">
          <div>
            <UsersThree className="text-neon-violet" size={85} />
          </div>
        </div>
        <h1 className="font-dongle text-5xl font-extrabold text-neon-violet">
          Contribution
        </h1>
      </div>
      <div className="flex flex-col items-center gap-10 ">
        <div>
          <p className="text-neon-pink mb-2">Select an existing course to contribute to</p>
          <div className="border-2 border-neon-violet rounded-lg">
            <select className="bg-neon-cyan font-semibold text-black mr-3">
              <option>Select course</option>
            </select>
            <input type="text" placeholder="Title" className="bg-nav-purple rounded-lg outline-none" />
          </div>
        </div>Ï

        <button>Submit</button>
        <div className="bg-component-purple border-2 flex-1 w-5/6 mx-auto h-full text-white">
          <p> Placeholder for adding new content</p>
        </div>
        <div className="bg-component-purple border-2 flex-1 w-5/6 mx-auto h-full text-white">
          <p> Placeholder for items component</p>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
