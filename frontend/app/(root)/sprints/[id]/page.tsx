"use client";

import {
  HighPriorityIcon,
  HigherPriorityIcon,
  HighestPriorityIcon,
} from "@/icons/icons";
import { DragResult, SprintProps, TaskProps, User } from "@/types/types";
import { SPRINT, UPDATE_STATUS, USERS } from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DragEvent,
  DragEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd";

const SprintDetailPage = () => {
  const pathname = usePathname();
  const { data } = useQuery(SPRINT, {
    variables: {
      id: pathname.split("/")[2],
    },
  });
  const { data: users } = useQuery(USERS);
  const [sprint, setSprints] = useState<SprintProps | null>(null);
  const [sprintUsers, setSprintUsers] = useState([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [updateTaskStatusMutation] = useMutation(UPDATE_STATUS);

  useEffect(() => {
    if (data?.sprint) {
      setSprints(data.sprint);
      setTasks(data.sprint?.tasks);
    }
    if (users?.users) setSprintUsers(users.users);
  }, [data?.sprint, users?.users]);

  const taskDropHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination?.droppableId === source?.droppableId &&
      destination.index === source.index
    ) {
      const updatedTask = [...tasks];
      const [moveTask] = updatedTask.splice(source.index, 1);
      updatedTask.splice(destination.index, 0, moveTask);
      setTasks(updatedTask);
    } else {
      const taskId = draggableId;
      const newStatus = destination?.droppableId;
      updateTaskStatusMutation({
        variables: {
          id: taskId,
          data: { status: newStatus },
        },
      });
      const updatedTask = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTask);
    }
  };

  return (
    <div className="">
      <h1 className="text-[1.6rem] font-semibold">{sprint?.title}</h1>
      <p className="text-gray-500 text-sm" title={sprint?.description}>
        {sprint?.description?.substr(0, 140)}
        {sprint?.description && "..."}
      </p>
      <div className="mt-5 flexStart gap-3">
        <input
          className="w-40 mb-0 bg-slate-900 border-0 focus:w-52"
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
                <div className="uppercase tracking-widest w-9 h-9 bg-slate-900 rounded-full flexCenter text-[13px] font-bold -ml-2 first:ml-0">
                  {user?.name.substr(0, 2)}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto pb-5">
        <DragDropContext onDragEnd={taskDropHandler}>
          <div className="flexBetween gap-5 max-md:gap-3 mt-10 max-md:w-[50rem]">
            {sprint?.status.map((st) => (
              <Droppable droppableId={st}>
                {(provided: DroppableProvided) => (
                  <div
                    key={sprint.id}
                    className="bg-slate-900 min-h-[30rem] py-3 px-4 flex-1 max-md:w-[32rem]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="font-bold text-center">{st}</div>
                    {tasks
                      ?.filter((task) => task.status === st)
                      ?.map((task, idx) => (
                        <Draggable
                          key={task?.id}
                          draggableId={task?.id}
                          index={idx}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              className="p-3 bg-slate-800 font-normal mt-5"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <div className="font-semibold">{task?.title}</div>
                              <div className="mt-5 capitalize flexStart text-sm gap-1">
                                <span>{task?.priority}</span>
                                {task?.priority === "high" && (
                                  <HighPriorityIcon />
                                )}
                                {task?.priority === "highest" && (
                                  <HigherPriorityIcon />
                                )}
                                {task?.priority === "major" && (
                                  <HighestPriorityIcon />
                                )}
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
                                  <div className="uppercase tracking-widest w-9 h-9 bg-sky-900-600 rounded-full flexCenter text-[13px] font-bold ml-auto">
                                    {task?.assigneeId?.name?.substr(0, 2)}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default SprintDetailPage;
