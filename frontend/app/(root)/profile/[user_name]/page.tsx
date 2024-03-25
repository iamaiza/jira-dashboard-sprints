"use client"

import UserInputs from "@/components/user-inputs";
import useCurrentUser from "@/context/CurrentUserContext";
import { EmailIcon } from "@/icons/icons";
import Image from "next/image";

const Profile = () => {
    const { user } = useCurrentUser();
    return (
      <div className="mt-32 max-w-5xl mx-auto flex justify-between">
        <div className="max-w-[17rem] w-full">
          <div>
            {user?.imgUrl ? (
              <Image
                className="rounded-full border-4"
                src={user?.imgUrl}
                alt="user-img"
                width={128}
                height={128}
              />
            ) : (
              <div className="uppercase tracking-widest w-32 h-32 bg-sky-900 rounded-full flexCenter text-5xl font-bold border-4">
                {user?.name.substr(0, 2)}
              </div>
            )}
          </div>
          <div className="text-[1.7rem] font-semibold text-gray-600 mt-4">
            {user?.name}
          </div>
          <div className="mt-9 shadow-sm shadow-gray-300 w-full p-5">
            <div>
              <span className="uppercase text-xs tracking-widest font-bold text-gray-500">
                about
              </span>
              <UserInputs />
            </div>
            <div className="mt-6 cursor-not-allowed">
              <span className="uppercase text-xs tracking-widest font-bold text-gray-500">
                contact
              </span>
              <div className="text-sm text-gray-500 mt-2 flex gap-3">
                <EmailIcon />
                <span className="">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div>Tasks</div>
      </div>
    )
};

export default Profile;