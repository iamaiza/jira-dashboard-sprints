import { TaskProps } from "@/types/types";
import { issueStatuses } from "@/utils/issues";
import { UPDATE_TASK_STATUS } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const TaskDetail2 = ({ task }: { task: TaskProps | null }) => {
  const [updateTask, setUpdateTask] = useState("");
  const [updateStatusMutation] = useMutation(UPDATE_TASK_STATUS);
  useEffect(() => {
    if (task?.status) setUpdateTask(task.status);
  }, [task?.status]);
  const updateTaskStatusHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateTask(e.target.value);
    const { data } = await updateStatusMutation({
      variables: {
        data: {
          taskId: task?.id,
          status: e.target.value,
        },
      },
    });

    setUpdateTask(data?.updatedTask?.status);
  };
  return (
    <div className="w-[25rem] pt-2">
      <div className="w-fit">
        <select
          name=""
          id=""
          className="bg-slate-900 text-slate-400 outline-none border-0 capitalize"
          value={updateTask}
          onChange={updateTaskStatusHandler}
        >
          <option value={task?.status}>{task?.status}</option>
          {issueStatuses
            ?.filter((st) => st.status != task?.status.toLowerCase())
            .map((st) => (
              <option key={st.id} value={st.status}>
                {st.status}
              </option>
            ))}
        </select>
      </div>
      <div className="border border-slate-800 py-3">
        <div className="border-b border-slate-800 pb-3 px-3">Details</div>
        <div className="px-3 pt-5 text-sm">
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2">
            <div className="flex-1">Assignee</div>
            {task?.assigneeId?.name ? (
              <div className="flex-1 flex items-center gap-3">
                {task?.assigneeId?.imgUrl ? (
                  <Image
                    className="rounded-full"
                    src={task.assigneeId.imgUrl}
                    alt={task?.assigneeId?.name}
                    width={27}
                    height={27}
                  />
                ) : (
                  <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                    {task?.assigneeId?.name.substr(0, 2)}
                  </div>
                )}
                <div className="font-bold">{task?.assigneeId?.name}</div>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-3">
                {task?.assigneeId?.imgUrl ? (
                  <Image
                    className="rounded-full"
                    src={task.assigneeId.imgUrl}
                    alt={task?.assigneeId?.name}
                    width={27}
                    height={27}
                  />
                ) : (
                  <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                    {task?.assigneeId?.name.substr(0, 2)}
                  </div>
                )}
                <div className="font-bold">{task?.assigneeId?.name}</div>
              </div>
            )}
          </div>
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-4">
            <div className="flex-1">Reporter</div>
            <div className="flex-1 flex items-center gap-3">
              {task?.reporterId?.imgUrl ? (
                <Image
                  className="rounded-full"
                  src={task.reporterId.imgUrl}
                  alt={task?.reporterId?.name}
                  width={27}
                  height={27}
                />
              ) : (
                <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                  {task?.reporterId?.name.substr(0, 2)}
                </div>
              )}
              <div className="font-bold">{task?.reporterId?.name}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center max-lg:flex-col max-[1050px]:items-start gap-2">
            <div className="flex-1">Sprint</div>
            <div className="flex-1 text-sky-600">{task?.sprintId?.title}</div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1">Priority</div>
            <div className="flex-1 capitalize">{task?.priority}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail2;
