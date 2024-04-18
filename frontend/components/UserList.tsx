import { UserListProps } from "@/types/types";
import Image from "next/image";
import ProfilePhoto from "./ProfilePhoto";

const UserList = (props: UserListProps) => {
    const { imgUrl, name } = props;
  return (
    <div className="flex-1 flex items-center gap-3">
      <ProfilePhoto imgUrl={imgUrl} name={name} />
      <div className="text-sm">{name}</div>
    </div>
  );
};

export default UserList;
