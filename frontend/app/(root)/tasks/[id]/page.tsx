"use client"

import TaskDetail1 from "@/components/taskDetail1";
import TaskDetail2 from "@/components/taskDetail2";
import { TaskProps } from "@/types/types";
import { TASK } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TaskDetail = () => {
    const pathname = usePathname();
    const { data } = useQuery(TASK, {
        variables: {
            id: pathname.split('/')[2]
        }
    })
  const [task, setTask] = useState<TaskProps | null>(null);
  const [showEditor, setShowEditor] = useState<string | null>(null);
  console.log(pathname.split('/')[2]);
  
  useEffect(() => {
    if(data?.task) setTask(data.task);
  }, [data?.task])

  const showDescEditor = () => setShowEditor("desc");
  const showCommentEditor = () => setShowEditor("comment");
  const hideEditor = () => setShowEditor(null);

  return (
    <div className="max-lg:overflow-x-auto max-lg:min-h-[87vh]">
      <div className="flex justify-between gap-5 mb-5 max-lg:w-[55rem]">
        <TaskDetail1
          task={task}
          showEditor={showEditor}
          showCommentEditor={showCommentEditor}
          showDescEditor={showDescEditor}
          hideEditor={hideEditor}
        />
        <TaskDetail2 task={task} />
      </div>
    </div>
  );
};

export default TaskDetail;
