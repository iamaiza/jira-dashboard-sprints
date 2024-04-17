"use client";

import useCurrentUser from "@/context/CurrentUserContext";
import { IssueProps, CommentProps, User } from "@/types/types";
import {
  ISSUE,
  UPDATE_ISSUE_DESC,
  DELETE_COMMENT,
  CREATE_COMMENT,
  UPDATE_TITLE,
} from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Comments from "@/components/Comments";
import Title from "@/components/Title";
import DetailPanel2 from "@/components/DetailPanel2";
import DetailPanel1 from "@/components/DetailPanel1";

const IssueDetail = () => {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const { data } = useQuery(ISSUE, {
    variables: {
      id: pathname.split("/")[2],
    },
  });
  const [issue, setIssue] = useState<IssueProps | null>(null);
  const [desc, setDesc] = useState("");
  const [showEditor, setShowEditor] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [comment, setComment] = useState("");
  const [updateDescMutation] = useMutation(UPDATE_ISSUE_DESC, {
    variables: {
      id: issue?.id,
    },
  });
  const [createCommentMutation] = useMutation(CREATE_COMMENT);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const [title, setTitle] = useState("");
  const [updateTitleMutation] = useMutation(UPDATE_TITLE);
  const [isUpdateTitle, setIsUpdatedTitle] = useState(false);
  const [updateTask, setUpdateTask] = useState("");

  useEffect(() => {
    if (data?.issue) setIssue(data.issue);
    if (issue?.description) setDesc(issue.description);
    if (issue?.comments) setComments(issue.comments);
    if (issue?.taskId?.title) setTitle(issue.taskId.title);
    if (issue?.taskId?.status) setUpdateTask(issue.taskId.status);
  }, [
    data?.issue,
    issue?.description,
    issue?.comments,
    issue?.taskId?.title,
    issue?.taskId?.status,
  ]);

  const hideEditor = () => setShowEditor(null);

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
  const createCommentHandler = async () => {
    try {
      if (!comment.trim()) return;
      const { data } = await createCommentMutation({
        variables: {
          data: {
            text: comment,
            userId: user?.id,
            issueId: issue?.id,
          },
        },
      });
      setComments([...comments, data?.createComment]);
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

  const updateTitleHandler = async () => {
    const { data } = await updateTitleMutation({
      variables: {
        data: {
          title: title,
          id: issue?.taskId?.id,
        },
      },
    });
    setTitle(data?.updateTitle?.title);
    setIsUpdatedTitle(false);
    console.log(data);
  };

  return (
    <div className="max-lg:overflow-x-auto">
      <div className="flex justify-between gap-5 mb-5 max-[900px]:w-[55rem]">
        <div className=" max-w-4xl w-full">
          <Title
            title={title}
            setTitle={setTitle}
            isUpdateTitle={isUpdateTitle}
            setIsUpdatedTitle={setIsUpdatedTitle}
            updateTitleHandler={updateTitleHandler}
          />
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
          assignee={issue?.assigneeId ?? null}
          reporter={issue?.reporterId ?? null}
          viewer={issue?.viewerId ?? null}
          qa={issue?.qaId ?? null}
          sprint={issue?.sprintId ?? null}
          priority={issue?.priority ?? ""}
          label={issue?.label ?? ""}
          issueType={issue?.issueType ?? ""}
          task={issue?.taskId ?? null}
          isTask={false}
          issue={issue}
        />
      </div>
    </div>
  );
};

export default IssueDetail;
