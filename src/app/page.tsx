import Link from "next/link";

// Home Page
export default function Home() {
  // TODO: Add styling
  // TODO: Add proper content

  return (
    <div className="flex flex-col items-center h-screen">
      {/* Splash */}
      <div className="flex flex-col items-center gap-4 m-12">
        <h1 className="font-dongle text-4xl font-bold">Welcome to</h1>
        <h1 className="font-dongle text-5xl font-extrabold">CourseHub!</h1>
        <p className="font-nunito text-lg">
          Your one-stop platform for UGA course resources
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-row items-center gap-12">
        <div className="flex flex-col items-center">
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Course Search
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Shared Resources
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-dongle text-4xl font-bold text-neon-pink">
            Contribute
          </h1>
          <p className="font-nunito text-lg">szdfsd</p>
        </div>
      </div>

      {/* Get Started Button */}
      <button className="bg-neon-cyan rounded-full px-3 py-1 m-12">
        <Link href="/course-search" className="text-black">
          Get Started!
        </Link>
      </button>
    </div>
  );
}
