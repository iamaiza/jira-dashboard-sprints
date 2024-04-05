"use client";

import CreateTaskModal from "@/components/Create-Task";
import { DeleteIcon } from "@/icons/icons";
import { TaskProps } from "@/types/types";
import { TASKS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { MouseEvent, useState } from "react";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(TASKS);
  const tasks = data?.tasks || [];

  const showModalHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="">
      <div className="text-end">
        <button
          className="bg-sky-950 text-slate-200 px-3 py-2 rounded"
          onClick={showModalHandler}
        >
          Create Task
        </button>
      </div>

      {showModal && (
        <>
          <div className="backdrop" onClick={() => setShowModal(false)} />
          <CreateTaskModal setShowModal={setShowModal} />
        </>
      )}
      <div className="max-md:overflow-x-auto min-h-[80vh]">
        {tasks?.length > 0 && (
          <table className="mt-10 w-full text-sm max-md:w-[45rem]">
            <thead>
              <tr>
                <th className="px-2">Id</th>
                <th className="px-2">Task Title</th>
                <th className="px-2">Task Status</th>
                <th className="px-2">Priority</th>
                <th className="px-2">Assignee Id</th>
                <th className="px-2">Reporter Id</th>
                <th className="px-2">Sprint Id</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task: TaskProps) => (
                <tr key={task?.id}>
                  <td className="py-2 px-2 text-center">{task?.id}</td>
                  <td className="py-2 px-2 text-center">
                    <Link href={`/tasks/${task?.id}`}>
                      {task?.title.substr(0, 25)}...
                    </Link>
                  </td>
                  <td className="py-2 px-2 text-center">{task?.status}</td>
                  <td className="py-2 px-2 text-center">{task?.priority}</td>
                  <td className="py-2 px-2 text-center">
                    {task?.assigneeId?.id}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {task?.reporterId?.id}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {task?.sprintId?.id}
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

export default Tasks;
