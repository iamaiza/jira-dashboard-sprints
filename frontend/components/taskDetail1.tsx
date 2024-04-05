import Image from "next/image";
import { useEffect, useState } from "react";
import DescCommentInput from "./desc-comment-input";
import { CommentProps, TaskProps } from "@/types/types";
import useCurrentUser from "@/context/CurrentUserContext";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_DESCRIPTION } from "@/utils/query-mutations";
import Comments from "./Comments";

const TaskDetail1 = ({
  task,
  showEditor,
  showDescEditor,
  showCommentEditor,
  hideEditor,
}: {
  task: TaskProps | null;
  showEditor: string | null;
  showDescEditor: () => void;
  showCommentEditor: () => void;
  hideEditor: () => void;
}) => {
  const { user } = useCurrentUser();
  const [desc, setDesc] = useState("");
  const [comment, setComment] = useState("");
  const [updateDescMutation] = useMutation(UPDATE_DESCRIPTION, {
    variables: {
      id: task?.id,
    }
  });
  const [createCommentMutation] = useMutation(CREATE_COMMENT)
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT)

  useEffect(() => {
    if(task?.description) setDesc(task.description)
    if(task?.comments) setComments(task.comments)
  }, [task?.description, task?.comments])

  const handleChange = (value: string) => {
    if (showEditor === "desc") {
      setDesc(value);
    } else {
      setComment(value);
    }
  };
  const updateDescHandler = async () => {
    try {
      if(!desc.trim()) return;
      const { data } = await updateDescMutation({
        variables: {
          data: {
            description: desc
          }
        }
      })
      hideEditor();
    } catch (error) {
      console.log(error);
    }
  };
  const stripeHTMLTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const formattedDesc = desc ? stripeHTMLTags(desc) : "";
  const createCommentHandler = async () => {
    try {
      if(!comment.trim()) return;
      const { data } = await createCommentMutation({
        variables: {
          data: {
            text: comment,
            taskId: task?.id,
            userId: user?.id
          }
        }
      })
      setComments([...comments, data?.createComment])
      hideEditor();
    } catch (error) {
      console.log(error);
    }
  };

  const getDescInHTMLFormat = () => {
    if(formattedDesc) {
      return <div className="desc-list-style" dangerouslySetInnerHTML={{ __html: desc }} />
    } else {
      return <div children="Add description..." />
    }
  }

  const deleteCommentHandler = async(commentId: string) => {
    await deleteCommentMutation({
      variables: {
        id: commentId
      }
    })
    setComments(comments.filter(comment => comment.id !== commentId))
  }

  return (
    <div className=" max-w-4xl w-full">
      <h1 className="font-semibold text-2xl">{task?.title}</h1>
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
            onClick={showDescEditor}>{getDescInHTMLFormat()}</div>
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
              <DescCommentInput state={comment} handleChange={handleChange} />
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
  );
};

export default TaskDetail1;
