import { UserListProps } from "@/types/types";
import Image from "next/image";

const UserList = (props: UserListProps) => {
    const { imgUrl, name } = props;
  return (
    <div className="flex-1 flex items-center gap-3">
      {imgUrl ? (
        <Image
          className="rounded-full"
          src={imgUrl}
          alt={name}
          width={27}
          height={27}
        />
      ) : (
        <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
          {name?.substr(0, 2)}
        </div>
      )}
      <div className="text-sm">{name}</div>
    </div>
  );
};

export default UserList;
