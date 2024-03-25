import { TaskProps } from "@/types/types";
import Image from "next/image";

const TaskDetail2 = ({ task }: { task: TaskProps | null }) => {
  return (
    <div className="flex-1 pt-2">
      <div className="w-fit">
        <select name="" id="">
          <option value="to-do">To-Do</option>
          {task?.sprintId?.status?.map((st) => (
            <option key={task?.sprintId?.id} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>
      <div className="border py-3">
        <div className="border-b pb-3 px-3">Details</div>
        <div className="px-3 pt-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex-1">Assignee</div>
            <div className="flex-1 flex items-center gap-3">
              {task?.assigneeId?.imgUrl ? (
                <Image
                  className="rounded-full"
                  src={task.assigneeId.imgUrl}
                  alt={task?.assigneeId?.name}
                  width={32}
                  height={32}
                />
              ) : (
                <div className="uppercase tracking-widest w-8 h-8 bg-sky-900 rounded-full flexCenter text-[13px] font-bold">
                  {task?.assigneeId?.name.substr(0, 2)}
                </div>
              )}
              <div className="font-bold text-sm">{task?.assigneeId?.name}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
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
