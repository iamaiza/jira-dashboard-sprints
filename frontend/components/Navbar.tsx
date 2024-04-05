"use client";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import useCurrentUser from "@/context/CurrentUserContext";
import cookie from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = ({setShowModal}: { setShowModal: (show: boolean) => void }) => {
  const [show, setShow] = useState(false);
  const { user, logoutHandler } = useCurrentUser();
  const router = useRouter();

  if (!user) return null;


  return (
    <div className="flexBetween gap-5 fixed top-0 left-0 w-full z-20 bg-slate-950 h-16 py-1 px-5 max-sm:px-3">
      <div className="flexCenter gap-4 sm:gap-8">
        <Link href="/" className="font-bold text-xl 2xl:text-2xl max-[400px]:text-[19px]">
          Dashboard
        </Link>
        <nav>
          <ul className="flexCenter gap-5 max-lg:hidden">
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
              <button className="py-2 px-4 bg-sky-950 text-slate-200" onClick={(e) => {
                e.preventDefault();
                setShowModal(true)
              }}>
                Create
              </button>
            </li>
          </ul>
          <MobileNav setShowModal={setShowModal} />
        </nav>
      </div>
      <div className="relative">
        <div onClick={() => setShow(!show)}>
          {user?.imgUrl ? (
            <Image
              className="rounded-full"
              src={user.imgUrl}
              alt="user"
              width={32}
              height={32}
            />
          ) : (
            <div className="bg-sky-950 w-8 h-8 flexCenter rounded-full uppercase tracking-widest text-sm">
              {user?.name.substr(0, 2)}
            </div>
          )}
        </div>
        {show && (
          <div className="absolute top-9 right-0 min-w-40 min-h-fit py-3 px-2 bg-slate-900 shadow-lg rounded">
            <div className="border-b border-slate-800 pb-3">
              <div className="flexStart gap-2">
                {user?.imgUrl ? (
                  <Image
                    className="rounded-full"
                    src={user.imgUrl}
                    alt="user"
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="bg-sky-950 w-8 h-8 flexCenter rounded-full uppercase tracking-widest text-sm">
                    {user?.name.substr(0, 2)}
                  </div>
                )}
                <div className="text-sm">{user?.name}</div>
              </div>
              <div className="text-[11px] mt-3">{user?.email}</div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <button className="w-fit" onClick={(e) => {
                e.preventDefault();
                router.push(`/profile/${user?.name}`)
                setShow(false)
              }}>Profile</button>
              <button className="w-fit" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
