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
}) => {
  // TODO: Add mobile menu
  // TODO: Add responsive design
  // TODO: Add styling
  // TODO: Add proper routing
  // TODO: Handle authentication state

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/course-search">Course Search</Link>
      <Link href="/contribute">Contribute</Link>
      {isAuthenticated ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
