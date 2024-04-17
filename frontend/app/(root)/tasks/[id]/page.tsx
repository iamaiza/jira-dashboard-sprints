"use client";

import Comments from "@/components/Comments";
import DetailPanel1 from "@/components/DetailPanel1";
import DetailPanel2 from "@/components/DetailPanel2";
import Title from "@/components/Title";
import useCurrentUser from "@/context/CurrentUserContext";
import { CommentProps, TaskProps, User } from "@/types/types";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  TASK,
  UPDATE_DESCRIPTION,
  UPDATE_TITLE,
} from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TaskDetail = () => {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const { data } = useQuery(TASK, {
    variables: {
      id: pathname.split("/")[2],
    },
  });
  const [task, setTask] = useState<TaskProps | null>(null);
  const [showEditor, setShowEditor] = useState<string | null>(null);
  const [updateTask, setUpdateTask] = useState("");
  const [desc, setDesc] = useState("");
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [isUpdateTitle, setIsUpdatedTitle] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [updateTitleMutation] = useMutation(UPDATE_TITLE);
  const [createCommentMutation] = useMutation(CREATE_COMMENT);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const [updateDescMutation] = useMutation(UPDATE_DESCRIPTION, {
    variables: {
      id: task?.id,
    },
  });

  useEffect(() => {
    if (data?.task) setTask(data.task);
    if (task?.status) setUpdateTask(task.status);
    if (task?.description) setDesc(task.description);
    if (task?.comments) setComments(task.comments);
    if (task?.title) setTitle(task.title);
  }, [data?.task, task?.status, task?.description, task?.comments, task?.title]);

  const hideEditor = () => setShowEditor(null);
  const updateTitleHandler = async () => {
    const { data } = await updateTitleMutation({
      variables: {
        data: {
          title: title,
          id: task?.id,
        },
      },
    });
    setTitle(data?.updateTitle?.title);
    setIsUpdatedTitle(false);
    console.log(data);
  };
  const createCommentHandler = async () => {
    try {
      if (!comment.trim()) return;
      const { data } = await createCommentMutation({
        variables: {
          data: {
            text: comment,
            taskId: task?.id,
            userId: user?.id,
          },
        },
      });
      setComments([...comments, data?.createComment]);
      hideEditor();
    } catch (error) {
      console.log(error);
    }
  };
  const updateDescHandler = async () => {
    try {
      if (!desc.trim()) return;
      const { data } = await updateDescMutation({
        variables: {
          data: {
            description: desc,
          },
        },
      });
      hideEditor();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCommentHandler = async (commentId: string) => {
    await deleteCommentMutation({
      variables: {
        id: commentId,
      },
    });
    setComments(comments.filter((comment) => comment.id !== commentId));
  };
  return (
    <div className="max-lg:overflow-x-auto max-lg:min-h-[87vh]">
      <div className="flex justify-between gap-5 mb-5 max-[900px]:w-[55rem]">
        <div className=" max-w-4xl w-full">
          <div id="title">
            <Title
              title={title}
              setTitle={setTitle}
              isUpdateTitle={isUpdateTitle}
              setIsUpdatedTitle={setIsUpdatedTitle}
              updateTitleHandler={updateTitleHandler}
            />
          </div>
          <DetailPanel1
            desc={desc}
            setDesc={setDesc}
            comment={comment}
            setComment={setComment}
            createCommentHandler={createCommentHandler}
            updateDescHandler={updateDescHandler}
            hideEditor={hideEditor}
            showEditor={showEditor || ""}
            setShowEditor={setShowEditor}
          />
          {comments?.map((comment) => (
            <Comments comment={comment} deleteComment={deleteCommentHandler} />
          ))}
        </div>
        <DetailPanel2
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
          assignee={task?.assigneeId ?? null}
          reporter={task?.reporterId ?? null}
          viewer={task?.viewerId ?? null}
          qa={task?.qaId ?? null}
          sprint={task?.sprintId ?? null}
          priority={task?.priority ?? ""}
          task={task}
          isTask={true}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
