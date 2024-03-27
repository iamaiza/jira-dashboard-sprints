"use client"

import useCurrentUser from "@/context/CurrentUserContext";
import { TaskProps } from "@/types/types";
import { TASKS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Image from "next/image";

const YourWork = () => {
  const { user } = useCurrentUser();
  const { data } = useQuery(TASKS);
  const filterTaskByUser = data?.tasks?.filter((task: TaskProps) => task?.assigneeId?.id === user?.id)
  return (
    <>
      {filterTaskByUser?.length > 0 ? (
        <table className="mt-2 w-full max-w-2xl mx-auto">
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
                <tr className="border-b">
                  <td className="text-center py-1 text-sm">{task?.id}</td>
                  <td className="text-center py-1 text-sm text-sky-700">
                    {task?.title}
                  </td>
                  <td className="text-center py-1 text-sm text-slate-600">
                    {task?.assigneeId?.name || user?.name}
                  </td>
                  <td className="text-center py-1">
                    <Image
                      className="mx-auto"
                      src={`/assets/${task?.priority}.png`}
                      alt="priority"
                      width={20}
                      height={20}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">You haven't been assigned any task.</div>
      )}
    </>
  );
};

export default YourWork;
