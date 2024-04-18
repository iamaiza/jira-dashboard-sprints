import { UserIcon } from "@/icons/icons";
import UserList from "./UserList";
import { TaskUsersProps } from "@/types/types";

const TaskUsers = (props: TaskUsersProps) => {
  const {
    user,
    showList,
    setShowList,
    isClicked,
    setIsClicked,
    users,
    updateUsersHandler,
    selectedUser,
  } = props;
  return (
    <>
      {user ? (
        <div
          className="flex-1 max-[1050px]:w-full relative cursor-default"
          onClick={() => {
            setShowList(!showList);
            setIsClicked(selectedUser);
          }}
        >
          <UserList imgUrl={user?.imgUrl} name={user?.name} />
          {showList && isClicked == selectedUser && (
            <div
              className={`flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 ${
                selectedUser === "assignee" || selectedUser === "reporter"
                  ? "mt-1"
                  : "mb-1 bottom-full"
              }`}
            >
              <div
                className="flex items-center gap-3"
                onClick={() => updateUsersHandler(null, selectedUser)}
              >
                <div className="bg-gray-700 p-0.5 rounded-full">
                  <UserIcon />
                </div>
                <div>None</div>
              </div>
              {users.length > 0 &&
                users.map((user) => (
                  <div
                    key={user?.id}
                    onClick={() => updateUsersHandler(user, selectedUser)}
                  >
                    <UserList imgUrl={user?.imgUrl} name={user?.name} />
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex-1 max-[1050px]:w-full relative cursor-default"
          onClick={() => {
            setShowList(!showList);
            setIsClicked(selectedUser);
          }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 p-0.5 rounded-full">
              <UserIcon />
            </div>
            <div>{selectedUser === "assignee" ? "Not Assigned" : "None"}</div>
          </div>
          {showList && isClicked == selectedUser && (
            <div
              className={`flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 ${
                selectedUser === "assignee" || selectedUser === "reporter"
                  ? "mt-1"
                  : "mb-1 bottom-full"
              }`}
            >
              <div
                className="flex items-center gap-3"
                onClick={() => updateUsersHandler(null, selectedUser)}
              >
                <div className="bg-gray-700 p-0.5 rounded-full">
                  <UserIcon />
                </div>
                <div>None</div>
              </div>
              {users.length > 0 &&
                users.map((user) => (
                  <div
                    key={user?.id}
                    onClick={() => updateUsersHandler(user, selectedUser)}
                  >
                    <UserList imgUrl={user?.imgUrl} name={user?.name} />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TaskUsers;
