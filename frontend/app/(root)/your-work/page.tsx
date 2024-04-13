"use client";

import useCurrentUser from "@/context/CurrentUserContext";
import {
  HighPriorityIcon,
  HigherPriorityIcon,
  HighestPriorityIcon,
} from "@/icons/icons";
import { TaskProps } from "@/types/types";
import { TASKS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

const YourWork = () => {
  const { user } = useCurrentUser();
  const { data } = useQuery(TASKS);
  const filterTaskByUser = data?.tasks?.filter(
    (task: TaskProps) => task?.assigneeId?.id === user?.id
  );
  return (
    <div className="max-sm:overflow-x-auto min-h-[87vh]">
      {filterTaskByUser?.length > 0 ? (
        <table className="mt-2 w-full max-w-2xl max-sm:w-[30rem] mx-auto">
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
                  <td className="text-center py-1 text-sm">
                    <Link className="block w-full" href={`/tasks/${task?.id}`}>
                      {task?.id}
                    </Link>
                  </td>
                  <td className="text-center py-1 text-sm text-sky-500">
                    <Link className="block w-full" href={`/tasks/${task?.id}`}>
                      {task?.title.substr(0, 25)}...
                    </Link>
                  </td>
                  <td className="text-center py-1 text-sm">
                    <Link className="block w-full" href={`/tasks/${task?.id}`}>
                      {task?.assigneeId?.name || user?.name}
                    </Link>
                  </td>
                  <td className="py-1">
                    <Link className="w-full flex justify-center " href={`/tasks/${task?.id}`}>
                      {task?.priority === "high" && <HighPriorityIcon />}
                      {task?.priority === "highest" && <HigherPriorityIcon />}
                      {task?.priority === "major" && <HighestPriorityIcon />}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">You haven't been assigned any task.</div>
      )}
    </div>
  );
};

export default YourWork;
