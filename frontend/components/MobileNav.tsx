import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const showLinksHandler = () => {
    setShowLinks(!showLinks);
  };
  return (
    <div className="lg:hidden flexCenter gap-3 sm:gap-5 relative">
      <div
        className="flexCenter gap-1 cursor-default"
        onClick={showLinksHandler}
      >
        <span>More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {showLinks && (
        <ul className="absolute top-12 left-0 bg-gray-200 min-w-36 py-2 px-3 flex flex-col gap-3">
          <li>
            <Link href="/your-work">Your work</Link>
          </li>
          <li>
            <Link href="/tasks">Tasks</Link>
          </li>
          <li>
            <Link href="/issues">Issues</Link>
          </li>
          <li>
            <button className="text-lg bg-pink-600 text-white px-2.5 py-1 hidden max-sm:block">
              Create
            </button>
          </li>
        </ul>
      )}

      <button className="py-0.5 px-2.5 text-lg bg-pink-600 text-white max-sm:hidden">
        +
      </button>
    </div>
  );
};

export default MobileNav;
