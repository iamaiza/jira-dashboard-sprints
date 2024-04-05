import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MobileNav = ({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) => {
  const [showLinks, setShowLinks] = useState(false);
  const router = useRouter();
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
        <ul className="absolute top-12 left-0 bg-slate-900 min-w-36 py-2 px-3 flex flex-col gap-3">
          <li>
            <button onClick={e => {
              e.preventDefault();
              router.push("/your-work")
              setShowLinks(false)
            }}>Your work</button>
          </li>
          <li>
            <button onClick={e => {
              e.preventDefault();
              router.push("/tasks")
              setShowLinks(false)
            }}>Tasks</button>
          </li>
          <li>
            <button onClick={e => {
              e.preventDefault();
              router.push("/issues")
              setShowLinks(false)
            }}>Issues</button>
          </li>
          <li>
            <button
              className="text-lg bg-sky-900 text-white px-2.5 py-1 hidden max-sm:block"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
                setShowLinks(false)
              }}
            >
              Create
            </button>
          </li>
        </ul>
      )}

      <button
        className="py-0.5 px-2.5 text-lg bg-sky-950 text-slate-200 max-sm:hidden"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
          
        }}
      >
        +
      </button>
    </div>
  );
};

export default MobileNav;
