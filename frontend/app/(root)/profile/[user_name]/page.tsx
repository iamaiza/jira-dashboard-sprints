"use client";

import UserInputs from "@/components/user-inputs";
import useCurrentUser from "@/context/CurrentUserContext";
import {
  EmailIcon,
  HighPriorityIcon,
  HigherPriorityIcon,
  HighestPriorityIcon,
} from "@/icons/icons";
import { TaskProps } from "@/types/types";
import { TASKS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Image from "next/image";

const Profile = () => {
  const { user } = useCurrentUser();
  const { data } = useQuery(TASKS);
  return (
    <div className="max-md:overflow-x-auto mt-32 mb-5">
      <div className="max-w-5xl max-md:w-[50rem] mx-auto flex justify-start items-start gap-3">
        <div className="max-w-[17rem] w-full">
          <div>
            {user?.imgUrl ? (
              <Image
                className="rounded-full border-4 border-slate-900"
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
          <div className="text-[1.7rem] font-semibold text-gray-500 mt-4">
            {user?.name}
          </div>
          <div className="mt-9 shadow-2xl w-full p-5">
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
        {data?.tasks && (
          <table className="mt-2 w-full">
            <thead>
              <tr>
                <th className="py-1">Id</th>
                <th className="py-1">Title</th>
                <th className="py-1">Assignee</th>
                <th className="py-1">Priority</th>
              </tr>
            </thead>
            <tbody>
              {data?.tasks
                .filter((task: TaskProps) => task.assigneeId?.id === user?.id)
                .map((task: TaskProps) => (
                  <tr className="border-b border-slate-800">
                    <td className="text-center py-1 text-sm">{task?.id}</td>
                    <td className="text-center py-1 text-sm text-sky-500">
                      {task?.title}
                    </td>
                    <td className="text-center py-1 text-sm">
                      {task?.assigneeId?.name || user?.name}
                    </td>
                    <td className="flexCenter py-1">
                      {task?.priority === "high" && <HighPriorityIcon />}
                      {task?.priority === "highest" && <HigherPriorityIcon />}
                      {task?.priority === "major" && <HighestPriorityIcon />}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
