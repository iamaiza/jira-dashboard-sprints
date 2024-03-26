import Image from "next/image";
import { useEffect, useState } from "react";
import DescCommentInput from "./desc-comment-input";
import { TaskProps, User } from "@/types/types";
import useCurrentUser from "@/context/CurrentUserContext";
import { useMutation } from "@apollo/client";
import { UPDATE_DESCRIPTION } from "@/utils/query-mutations";

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

  useEffect(() => {
    if(task?.description) setDesc(task.description)
  }, [task?.description])

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
    //   await axios.post(`/api/tasks/${task.id}/comment`, {
    //     comment,
    //     authorId: user?.id,
    //     taskID: task?.id
    //   });
    //   hideEditor();
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
                className="bg-pink-600 text-white px-3 py-2"
                onClick={updateDescHandler}
              >
                Save
              </button>
              <button
                className="px-3 py-2 hover:bg-gray-200"
                onClick={hideEditor}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="w-full min-h-10 p-2 text-sm hover:bg-gray-100 mt-2 cursor-default rounded"
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
          <div className="uppercase tracking-widest w-9 h-9 bg-sky-900 rounded-full flexCenter text-[13px] font-bold">
            {user?.name.substr(0, 2)}
          </div>
        )}
        <div className="flex-1">
          {showEditor === "comment" ? (
            <div>
              <DescCommentInput state={comment} handleChange={handleChange} />
              <div className="mt-4 flexStart gap-2">
                <button
                  className="bg-pink-600 text-white px-3 py-2"
                  onClick={createCommentHandler}
                >
                  Save
                </button>
                <button
                  className="px-3 py-2 hover:bg-gray-200"
                  onClick={hideEditor}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-10 p-2 text-sm hover:bg-gray-100 cursor-default rounded"
              children="Add comment"
              onClick={showCommentEditor}
            ></div>
          )}
        </div>
      </div>
      {/* {comments?.map((comment) => (
        <Comments comment={comment} />
      ))} */}
    </div>
  );
};

export default TaskDetail1;
