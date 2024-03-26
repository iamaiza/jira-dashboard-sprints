import { DeleteIcon, EditIcon } from "@/icons/icons";
import { CommentProps } from "@/types/types";
import Image from "next/image";

const Comments = ({ comment }: { comment: CommentProps }) => {
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
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: comment?.text }}
        />
        <div className="flexStart gap-2">
            <EditIcon className="w-3.5 h-3.5 stroke-sky-700" />
            <DeleteIcon className="w-3.5 h-3.5 stroke-red-500" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
