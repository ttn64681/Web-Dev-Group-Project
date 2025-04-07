import Link from "next/link";

// Home Page
export default function Home() {
  // TODO: Add styling
  // TODO: Add proper content

  return (
    <div className="flex flex-col items-center h-screen">
      {/* Splash */}
      <div className="flex flex-col items-center gap-4 m-12 border-2 border-neon-pink rounded-lg border-dashed p-32">
        <h1 className="font-dongle text-4xl font-bold text-neon-pink">
          Welcome to
        </h1>
        <h1 className="font-dongle text-5xl font-extrabold text-neon-pink">
          CourseHub!
        </h1>
        <p className="font-nunito text-lg text-neon-pink-subtitle">
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
      <button className="bg-neon-cyan text-[1.2rem] font-bold rounded-full px-5 py-2 text-black">
        <Link href="/course-search">Get Started!</Link>
      </button>
    </div>
  );
}
