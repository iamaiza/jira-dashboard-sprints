"use client";

import { SprintProps, User } from "@/types/types";
import { SPRINT, USERS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SprintDetailPage = () => {
  const pathname = usePathname();
  // const router = useRouter()
  const { data } = useQuery(SPRINT, {
    variables: {
      id: pathname.split("/")[2],
    },
  });
  const { data: users } = useQuery(USERS);
  const [sprint, setSprints] = useState<SprintProps | null>(null);
  const [sprintUsers, setSprintUsers] = useState([]);

  useEffect(() => {
    if (data?.sprint) setSprints(data.sprint);
    if (users?.users) setSprintUsers(users.users);
  }, [data?.sprint, users]);

  
  // const filterTasksByStatus = (status: string) => {
  //   return sprint?.tasks?.filter((tsk) => tsk.status === status);
  // };
  return (
    <div className="mt-32">
      <h1 className="text-[1.6rem] font-semibold">{sprint?.title}</h1>
      <p className="text-gray-500 text-sm" title={sprint?.description}>
        {sprint?.description?.substr(0, 140)}
        {sprint?.description && "..."}
      </p>
      <div className="mt-5 flexStart gap-3">
        <input
          className="w-40 mb-0 bg-gray-100 border-0 focus:w-52"
          type="text"
          placeholder="Search"
        />
        <div className="flexStart">
          {sprintUsers.map((user: User) => (
            <>
              {user.imgUrl ? (
                <Image
                  className="rounded-full -ml-1"
                  src={user.imgUrl}
                  alt={user.name}
                  width={36}
                  height={36}
                />
              ) : (
                <div className="uppercase tracking-widest w-9 h-9 bg-pink-600 rounded-full flexCenter text-[13px] font-bold -ml-2 first:ml-0">
                  {user?.name.substr(0, 2)}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className={`flexBetween gap-5 mt-10`}>
        {sprint?.status.map((st) => (
          <div
            key={sprint.id}
            className=" bg-gray-100 min-h-[30rem] py-3 px-4 flex-1"
          >
            <div className="font-bold text-center mb-5">{st}</div>
            {sprint?.tasks?.filter(task => task.status === st)?.map((task) => (
              <div key={task?.id} className="p-3 bg-gray-200 font-normal">
                <div className="font-semibold">{task?.title}</div>
                <div className="mt-5 capitalize flexStart text-sm">
                  <span>{task?.priority}</span>
                  <Image src={`/assets/${task?.priority}.png`} alt="priority" width={26} height={26} />
                </div>
                <div className="mt-5">
                  {task?.assigneeId?.imgUrl ? (
                    <Image
                      className="rounded-full ml-auto"
                      src={task?.assigneeId?.imgUrl}
                      alt={task?.assigneeId?.name}
                      width={26}
                      height={26}
                    />
                  ) : (
                    <div className="uppercase tracking-widest w-9 h-9 bg-sky-900 rounded-full flexCenter text-[13px] font-bold ml-auto">
                      {task?.assigneeId?.name?.substr(0, 2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SprintDetailPage;
