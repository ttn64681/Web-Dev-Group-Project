"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  return (
    <nav className="flex flex-row justify-between items-center p-4 pl-5 pr-5 bg-nav-purple">
      {/* Left side - Logo */}
      <Link href="/" className="font-dongle text-2xl font-bold text-neon-pink">
        CourseHub
      </Link>

      {/* Center - Navigation links */}
      <div className="flex gap-10 absolute left-1/2 transform -translate-x-1/2">
        <div
          className={`flex items-center justify-center w-20 h-16 ${
            pathname === "/"
              ? "text-neon-pink border-b-2 border-neon-pink"
              : "text-white duration-200 hover:text-neon-pink"
          }`}
        >
          <button>
            <Link href="/">Home</Link>
          </button>
        </div>

        <div
          className={`flex items-center justify-center w-20 h-16 ${
            pathname === "/course-search"
              ? "text-neon-pink border-b-2 border-neon-pink"
              : "text-white duration-200 hover:text-neon-pink"
          }`}
        >
          <button>
            <Link href="/course-search">Search</Link>
          </button>
        </div>

        <div
          className={`flex items-center justify-center w-20 h-16 ${
            pathname === "/contribute"
              ? "text-neon-pink border-b-2 border-neon-pink"
              : "text-white duration-200 hover:text-neon-pink"
          }`}
        >
          <button>
            <Link href="/contribute">Contribute</Link>
          </button>
        </div>
      </div>

      {/* Right side - Login/Logout */}
      {isAuthenticated ? (
        <button
          className="bg-neon-cyan rounded-full px-3 py-1 text-black"
          onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button className="bg-neon-cyan font-semibold rounded-full px-3 py-1 text-black">
          <Link href="/login">Login</Link>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
