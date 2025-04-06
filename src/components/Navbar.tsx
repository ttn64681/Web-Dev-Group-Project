"use client";

import Link from "next/link";

interface NavbarProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  username,
  onLogout,
  // onLogin will be in Login component
}) => {
  // TODO: Add mobile menu
  // TODO: Add responsive design
  // TODO: Add styling
  // TODO: Add proper routing
  // TODO: Handle authentication state

  return (
    <nav className="flex flex-row justify-between items-center p-4 pl-5 pr-5 bg-nav-purple">
      {/* Left side - Logo */}
      <Link href="/" className="font-dongle text-2xl font-bold text-neon-pink">
        CourseHub
      </Link>

      {/* Center - Navigation links */}
      <div className="flex gap-10 absolute left-1/2 transform -translate-x-1/2">
        <button className="text-white duration-200 hover:text-neon-pink">
          <Link href="/">Home</Link>
        </button>
        <button className="text-white duration-200 hover:text-neon-pink">
          <Link href="/course-search">Search</Link>
        </button>
        <button className="text-white duration-200 hover:text-neon-pink">
          <Link href="/contribute">Contribute</Link>
        </button>
      </div>

      {/* Right side - Login/Logout */}
      {isAuthenticated ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button className="bg-neon-cyan rounded-full px-3 py-1 text-black">
          <Link href="/login">Login</Link>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
