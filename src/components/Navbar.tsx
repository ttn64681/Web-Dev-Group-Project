'use client';

import { doLogout } from '@/app/actions';
import { authConfig } from '@/app/auth.config';
import NextAuth, { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaLess, FaTimes } from 'react-icons/fa'; // Icons for mobile menu

interface NavbarProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  username,
  onLogout
  // onLogin will be in Login component
}) => {
  // TODO: Add mobile menu
  // TODO: Add proper routing
  // TODO: Handle authentication state

  const { data: session, status } = useSession();

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(!!session?.user);
  const [User, setUser] = useState('');


  useEffect(() => { 
    if (status === "authenticated" && session?.user) {
      isAuthenticated = true;
      setIsLoggedIn(true);
      setUser(session.user.username || '');
    } else {
      isAuthenticated = false;
      setIsLoggedIn(false);
      setUser('');
    }
  }, [status, session]);

  const handleLogout = () => {
    onLogout();
    setIsLoggedIn(false);
  };

  async function update() {
  }

  /**
   * NavLink Component
   * A reusable component for navigation links with animated underline
   *
   * Props:
   * - href: The URL the link points to
   * - children: The text/content of the link
   *
   * Features:
   * - Animated underline that appears on hover
   * - Active state styling when on current page
   * - Smooth transitions for all animations
   */
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    // The 'group' class allows us to style child elements when parent is hovered
    <div className="relative group">
      {/* Button wrapper for the link */}
      <button className="flex items-center justify-center w-20 h-16">
        <Link
          href={href}
          className={`${
            // If current path matches link's href, use pink color
            pathname === href ? 'text-neon-pink' : 'text-white duration-200 hover:text-neon-pink'
          }`}
        >
          {children}
        </Link>
      </button>

      {/* Animated underline that appears on hover */}
      {/* Initially width is 0, expands to full width on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-pink group-hover:w-full transition-all duration-300" />

      {/* Permanent underline for active page */}
      {pathname === href && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-pink" />}
    </div>
  );

  return (
    <nav className="flex flex-row justify-between items-center p-4 pl-5 pr-5 bg-nav-purple relative">
      {/* Logo section - always visible */}
      <button
        type="button"
        title="CourseHub"
        className="hover:scale-105 hover:[text-shadow:0_0_10px_rgba(255,105,180,0.5)] transition-all duration-300"
      >
        <Link href="/" className="font-dongle text-2xl font-bold text-neon-pink">
          CourseHub
        </Link>
      </button>

      {/* Desktop NavLinks - hidden on mobile (md: shown) */}
      <div className="hidden md:flex gap-10 absolute left-1/2 transform -translate-x-1/2">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/course-search">Search</NavLink>
        <NavLink href="/contribute">Contribute</NavLink>
      </div>

      {/* Mobile Hamburger Button - shown on mobile, hidden on desktop (md:hidden) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white hover:text-neon-pink transition-colors duration-200"
      >
        {/* Toggle between hamburger and close icon */}
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu Overlay - appears when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-nav-purple z-50 flex flex-col items-center justify-center">
          {/* Close button in top-right corner */}
          <div className="absolute top-4 right-4">
            <button
              title="Close Menu"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-neon-pink transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
          </div>
          {/* Vertical stack of navigation links */}
          <div className="flex flex-col gap-8 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/course-search">Search</NavLink>
            <NavLink href="/contribute">Contribute</NavLink>
          </div>
        </div>
      )}

      {/* Login/Logout Button - hidden on mobile (md: shown) */}
      <div className="hidden md:block">
        {isLoggedin ? (
          <button
            className="bg-neon-cyan rounded-full px-3 py-1 text-black hover:scale-105 transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button className="bg-neon-cyan font-semibold rounded-full px-3 py-1 text-black hover:scale-105 transition-all duration-300">
            <Link href="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
