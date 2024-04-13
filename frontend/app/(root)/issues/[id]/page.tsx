"use client";

import DescCommentInput from "@/components/desc-comment-input";
import useCurrentUser from "@/context/CurrentUserContext";
import { IssueProps, CommentProps } from "@/types/types";
import { issueStatuses } from "@/utils/issues";
import {
  ISSUE,
  UPDATE_ISSUE_DESC,
  DELETE_COMMENT,
  CREATE_COMMENT,
  UPDATE_TITLE,
  UPDATE_TASK_STATUS,
} from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Comments from "@/components/Comments";
import { CheckIcon, XIcon } from "@/icons/icons";

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
  const [showIcons, setShowIcons] = useState(false);
  const [isUpdateTitle, setIsUpdatedTitle] = useState(false);
  const [updateTask, setUpdateTask] = useState("");
  const [updateStatusMutation] = useMutation(UPDATE_TASK_STATUS);

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

  const stripeHTMLTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const formattedDesc = desc ? stripeHTMLTags(desc) : "";
  const getDescInHTMLFormat = () => {
    if (formattedDesc) {
      return (
        <div
          className="desc-list-style"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      );
    } else {
      return <div children="Add description..." />;
    }
  };
  const handleChange = (value: string) => {
    if (showEditor === "desc") {
      setDesc(value);
    } else {
      setComment(value);
    }
  };
  const showDescEditor = () => setShowEditor("desc");
  const showCommentEditor = () => setShowEditor("comment");
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
  const deleteTitleHandler = () => {
    setIsUpdatedTitle(false);
  };

  const updateTaskStatusHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateTask(e.target.value);
    const { data } = await updateStatusMutation({
      variables: {
        data: {
          taskId: issue?.taskId?.id,
          status: e.target.value,
        },
      },
    });

    setUpdateTask(data?.updatedTask?.status);
  };


  return (
    <div className="max-lg:overflow-x-auto">
      <div className="flex justify-between gap-5 mb-5 max-lg:w-[55rem]">
        <div className=" max-w-4xl w-full">
          {isUpdateTitle ? (
            <div className="relative">
              <textarea
                className={`bg-transparent font-semibold text-2xl pl-0 h-fit text-slate-300 ${
                  isUpdateTitle && "pl-2 border border-slate-500"
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setShowIcons(true)}
                autoFocus={isUpdateTitle && true}
              />
              {showIcons && (
                <div className="flexCenter gap-1 absolute right-0 top-full z-10">
                  <div
                    className="bg-slate-900 py-2 px-2.5 rounded"
                    onClick={deleteTitleHandler}
                  >
                    <XIcon className="stroke-gray-400 w-4 h-4" />
                  </div>
                  <div
                    className="bg-slate-900 py-2 px-2.5 rounded"
                    onClick={updateTitleHandler}
                  >
                    <CheckIcon className="stroke-gray-400 w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <h1
              className="font-semibold text-2xl"
              onClick={() => setIsUpdatedTitle(true)}
            >
              {title}
            </h1>
          )}

          <div className="mt-8">
            <label className="font-bold">Description</label>
            {showEditor === "desc" ? (
              <div className="mt-2">
                <DescCommentInput state={desc} handleChange={handleChange} />
                <div className="mt-4 flexStart gap-2">
                  <button
                    className="bg-sky-950 text-slate-200 px-3 py-2"
                    onClick={updateDescHandler}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-2 hover:bg-slate-800"
                    onClick={hideEditor}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="w-full min-h-10 p-2 text-sm hover:bg-slate-900 mt-2 cursor-default rounded"
                onClick={showDescEditor}
              >
                {getDescInHTMLFormat()}
              </div>
            )}
          </div>
          <div
            className={`mt-10 flex ${
              showEditor ? "items-start" : "items-center"
            } gap-3`}
          >
            {user?.imgUrl ? (
              <Image
                className="rounded-full"
                src={user.imgUrl}
                alt={user.name}
                width={32}
                height={32}
              />
            ) : (
              <div className="uppercase tracking-widest w-9 h-9 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                {user?.name.substr(0, 2)}
              </div>
            )}
            <div className="flex-1">
              {showEditor === "comment" ? (
                <div>
                  <DescCommentInput
                    state={comment}
                    handleChange={handleChange}
                  />
                  <div className="mt-4 flexStart gap-2">
                    <button
                      className="bg-sky-950 text-slate-200 px-3 py-2"
                      onClick={createCommentHandler}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-2 hover:bg-slate-800"
                      onClick={hideEditor}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full h-10 p-2 text-sm hover:bg-slate-900 cursor-default rounded"
                  children="Add comment"
                  onClick={showCommentEditor}
                ></div>
              )}
            </div>
          </div>
          {comments?.map((comment) => (
            <Comments comment={comment} deleteComment={deleteCommentHandler} />
          ))}
        </div>
        <div className="w-[25rem] pt-2">
          <div className="w-fit">
            <select
              name=""
              id=""
              className="bg-slate-900 text-slate-400 outline-none border-0 capitalize"
              value={updateTask}
              onChange={updateTaskStatusHandler}
            >
              <option value={issue?.taskId?.status}>
                {issue?.taskId?.status}
              </option>
              {issueStatuses
                .filter(
                  (st) => st.status != issue?.taskId?.status.toLowerCase()
                )
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
                <div className="flex-1 flex items-center gap-3">
                  {issue?.assigneeId?.imgUrl ? (
                    <Image
                      className="rounded-full"
                      src={issue.assigneeId.imgUrl}
                      alt={issue?.assigneeId?.name}
                      width={27}
                      height={27}
                    />
                  ) : (
                    <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                      {issue?.assigneeId?.name.substr(0, 2)}
                    </div>
                  )}
                  <div className="font-bold">{issue?.assigneeId?.name}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center max-lg:flex-col max-lg:items-start gap-2">
                <div className="flex-1">Sprint</div>
                <div className="flex-1 text-sky-600">
                  {issue?.sprintId?.title}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">Priority</div>
                <div className="flex-1 capitalize">{issue?.priority}</div>
              </div>

              <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
                <div className="flex-1">Reporter</div>
                <div className="flex-1 flex items-center gap-3">
                  {issue?.reporterId?.imgUrl ? (
                    <Image
                      className="rounded-full"
                      src={issue.reporterId.imgUrl}
                      alt={issue?.reporterId?.name}
                      width={27}
                      height={27}
                    />
                  ) : (
                    <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                      {issue?.reporterId?.name.substr(0, 2)}
                    </div>
                  )}
                  <div className="font-bold">{issue?.reporterId?.name}</div>
                </div>
              </div>
              <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
                <div className="flex-1">Reviewer</div>
                <div className="flex-1 flex items-center gap-3">
                  {issue?.viewerId?.imgUrl ? (
                    <Image
                      className="rounded-full"
                      src={issue.viewerId.imgUrl}
                      alt={issue?.viewerId?.name}
                      width={27}
                      height={27}
                    />
                  ) : (
                    <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                      {issue?.viewerId?.name.substr(0, 2)}
                    </div>
                  )}
                  <div className="font-bold">{issue?.viewerId?.name}</div>
                </div>
              </div>
              <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
                <div className="flex-1">QA</div>
                <div className="flex-1 flex items-center gap-3">
                  {issue?.qaId?.imgUrl ? (
                    <Image
                      className="rounded-full"
                      src={issue.qaId.imgUrl}
                      alt={issue?.qaId?.name}
                      width={27}
                      height={27}
                    />
                  ) : (
                    <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
                      {issue?.qaId?.name.substr(0, 2)}
                    </div>
                  )}
                  <div className="font-bold">{issue?.qaId?.name}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">Label</div>
                <div className="flex-1 capitalize">{issue?.label}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">Type</div>
                <div className="flex-1 capitalize">{issue?.issueType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
