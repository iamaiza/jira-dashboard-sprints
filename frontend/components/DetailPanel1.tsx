"use client";

import Image from "next/image";
import Title from "./Title";
import DescCommentInput from "./desc-comment-input";
import Comments from "./Comments";
import { useState } from "react";
import useCurrentUser from "@/context/CurrentUserContext";
import { Detail1Props } from "@/types/types";
import ProfilePhoto from "./ProfilePhoto";

const DetailPanel1 = (props: Detail1Props) => {
  const {
    desc,
    setDesc,
    setComment,
    comment,
    createCommentHandler,
    updateDescHandler,
    hideEditor,
    showEditor,
    setShowEditor,
  } = props;
  const { user } = useCurrentUser();

  const showDescEditor = () => setShowEditor("desc");
  const showCommentEditor = () => setShowEditor("comment");

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

  return (
    <>
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
        <ProfilePhoto imgUrl={user?.imgUrl} name={user?.name as string} />
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
    </>
  );
};

export default DetailPanel1;
