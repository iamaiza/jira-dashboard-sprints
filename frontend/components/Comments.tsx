"use client";

import { DeleteIcon, EditIcon } from "@/icons/icons";
import { CommentProps } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import DescCommentInput from "./desc-comment-input";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "@/utils/query-mutations";

const Comments = ({ comment, deleteComment }: { comment: CommentProps, deleteComment: (id: string) => void }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [updateCommentMutation] = useMutation(UPDATE_COMMENT, {
    variables: {
      id: comment?.id,
    }
  });
  useEffect(() => {
    setCommentText(comment?.text)
  }, [comment?.text])
  const updateCommentHandler = async() => {
    try {
      const { data } = await updateCommentMutation({
        variables: {
          data: {
            text: commentText,
          }
        }
      })
      
      if(data?.updatedComment) setCommentText(data.updatedComment.text);
      setShowEditor(false);
    } catch (error) {
      console.error(error);
    }
  }
  const deleteCommentHandler = async() => {
    deleteComment(comment?.id)
  }
  return (
    <div className="flex items-start gap-2 mt-8 ml-5">
      {comment?.userId?.imgUrl ? (
        <Image
          className="rounded-full"
          src={comment?.userId?.imgUrl}
          alt={comment?.userId?.name}
          width={28}
          height={28}
        />
      ) : (
        <div className="uppercase tracking-widest w-9 h-9 bg-pink-600 text-white rounded-full flexCenter text-[13px] font-bold">
          {comment?.userId?.name?.substr(0, 2)}
        </div>
      )}
      <div>
        {showEditor ? (
          <div>
            <DescCommentInput
              state={commentText}
              handleChange={(value) => setCommentText(value)}
            />
            <div className="flex justify-end items-center my-2 gap-2 text-sm">
              <button className="bg-sky-900 text-white py-1.5 px-2" onClick={updateCommentHandler}>Update</button>
              <button className="bg-gray-700 py-1.5 px-2" onClick={(e) => {
                e.preventDefault();
                setShowEditor(false);
              }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: commentText }}
          />
        )}
        <div className="flexStart gap-2 mt-2">
          <div onClick={() => setShowEditor(true)}>
            <EditIcon className="w-3.5 h-3.5 stroke-sky-700" />
          </div>
          <div onClick={deleteCommentHandler}>
            <DeleteIcon className="w-3.5 h-3.5 stroke-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
