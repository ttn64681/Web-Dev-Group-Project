import Link from "next/link";

// Home Page
export default function Home() {
  // TODO: Add styling
  // TODO: Add animations
  // TODO: Add proper content
  // TODO: Add responsive design

  return (
    <div>
      <h1>Welcome to CourseHub</h1>
      <p>Your one-stop platform for UGA course resources</p>
      <Link href="/course-search">Explore Courses</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}
