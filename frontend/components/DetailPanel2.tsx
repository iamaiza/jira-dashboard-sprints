"use client";

import Select, { OptionProps, StylesConfig } from "react-select";
import { UserIcon } from "@/icons/icons";
import UserList from "./UserList";
import {
  issueLabel,
  issueStatuses,
  issueTypes,
  priorities,
} from "@/utils/issues";
import {
  Detail2Props,
  OptionType,
  SprintProps,
  User,
  UserListProps,
} from "@/types/types";
import React, { ChangeEvent, Ref, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  SPRINTS,
  UPDATE_ISSUE_LABEL_TYPE,
  UPDATE_TASK_ISSUE,
  UPDATE_TASK_STATUS,
  USERS,
  UPDATE_TASK_USERS,
} from "@/utils/query-mutations";

const DetailPanel2 = (props: Detail2Props) => {
  const {
    updateTask,
    setUpdateTask,
    task,
    assignee,
    sprint,
    priority,
    reporter,
    viewer,
    qa,
    label,
    issueType,
    isTask,
    issue,
  } = props;
  const [updateStatusMutation] = useMutation(UPDATE_TASK_STATUS);
  const { data } = useQuery(USERS);
  const { data: sprintsData } = useQuery(SPRINTS);
  const [users, setUsers] = useState<User[]>([]);
  const [sprints, setSprints] = useState<SprintProps[]>([]);
  const [showList, setShowList] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("");
  const [isClicked, setIsClicked] = useState<string | null>("");
  const [updateIssueLabelTypeMutation] = useMutation(UPDATE_ISSUE_LABEL_TYPE);
  const [updateTaskIssueMutation] = useMutation(UPDATE_TASK_ISSUE);
  const [updateUsersMutation] = useMutation(UPDATE_TASK_USERS);
  const [taskAssginee, setTaskAssignee] = useState<User | null>(null);
  const [taskReporter, setTaskReporter] = useState<User | null>(null);
  const [taskViewer, setTaskViewer] = useState<User | null>(null);
  const [taskQa, setTaskQa] = useState<User | null>(null);

  useEffect(() => {
    if (data?.users) setUsers(data.users);
    if (sprintsData?.sprints) setSprints(sprintsData.sprints);
    if (label) setSelectedLabel(label);
    if (issueType) setSelectedType(issueType);
    if (priority) setSelectedPriority(priority);
    if (sprint?.id) setSelectedSprint(sprint.id);
    if (assignee) setTaskAssignee(assignee);
    if (reporter) setTaskReporter(reporter);
    if (viewer) setTaskViewer(viewer);
    if (qa) setTaskQa(qa);
  }, [
    data?.users,
    label,
    issueType,
    priority,
    sprintsData?.sprints,
    sprint?.id,
    assignee,
    reporter,
    viewer,
    qa,
  ]);
  console.log(taskViewer, taskQa);

  const updateTaskStatusHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateTask(e.target.value);
    const { data } = await updateStatusMutation({
      variables: {
        data: {
          taskId: task?.id,
          status: e.target.value,
        },
      },
    });

    setUpdateTask(data?.updatedTask?.status);
  };

  const updateIssueLabelTypeHandler = async (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "label":
        setSelectedLabel(value);
        const { data } = await updateIssueLabelTypeMutation({
          variables: {
            data: {
              id: issue?.id,
              label: value,
            },
          },
        });
        setSelectedLabel(data?.updateIssueLabelType?.updatedIssue);
        break;
      case "issueType":
        setSelectedType(value);
        const { data: type } = await updateIssueLabelTypeMutation({
          variables: {
            data: {
              id: issue?.id,
              type: value,
            },
          },
        });
        setSelectedType(type?.updateIssueLabelType?.updatedIssue);
        break;
    }
  };

  const updateTaskIssueHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "priority") {
      setSelectedPriority(value);
    }
    if (name === "sprint") {
      setSelectedSprint(value);
    }
    setSelectedPriority(value);
    const { data } = await updateTaskIssueMutation({
      variables: {
        data: {
          id: task?.id,
          priority: name === "priority" ? value : selectedPriority,
          sprintId: name === "sprint" ? value : selectedSprint,
        },
      },
    });
    console.log(data);

    setSelectedPriority(data?.updateTaskIssue?.updateData);
    setSelectedSprint(data?.updateTaskIssue?.updateData);
  };

  const updateUsersHandler = async (user: User, userType: string) => {
    if (userType === "assignee") {
      setTaskAssignee(user);
    }
    if (userType === "reporter") {
      setTaskReporter(user);
    }
    if (userType === "viewer") {
      setTaskViewer(user);
    }
    if (userType === "qa") {
      setTaskQa(user);
    }
    const { data } = await updateUsersMutation({
      variables: {
        data: {
          id: task?.id,
          assigneeId: userType === "assignee" ? user?.id : taskAssginee?.id,
          reporterId: userType === "reporter" ? user?.id : taskReporter?.id,
          viewerId: userType === "viewer" ? user?.id : taskViewer?.id,
          qaId: userType === "qa" ? user?.id : taskQa?.id,
        },
      },
    });
    setShowList(false);
  };

  return (
    <div className="w-[30rem] pt-2">
      <div className="w-fit">
        <select
          className="bg-slate-900 text-slate-400 outline-none border-0 capitalize"
          value={updateTask}
          onChange={updateTaskStatusHandler}
        >
          <option value={status}>{status}</option>
          {issueStatuses
            .filter((st) => st.status != status.toLowerCase())
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
            {taskAssginee ? (
              <div
                className="flex-1 max-[1050px]:w-full relative cursor-default"
                onClick={() => {
                  setShowList(!showList);
                  setIsClicked("assignee");
                }}
              >
                <UserList
                  imgUrl={taskAssginee?.imgUrl}
                  name={taskAssginee?.name}
                />
                {showList && isClicked === "assignee" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "assignee")}
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
                  setIsClicked("assignee");
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 p-0.5 rounded-full">
                    <UserIcon />
                  </div>
                  <div>Not Assigned</div>
                </div>
                {showList && isClicked === "assignee" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "assignee")}
                        >
                          <UserList imgUrl={user?.imgUrl} name={user?.name} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
            <div className="flex-1">Reporter</div>
            {taskReporter ? (
              <div
                className="flex-1 max-[1050px]:w-full relative cursor-default"
                onClick={() => {
                  setShowList(true);
                  setIsClicked("reporter");
                }}
              >
                <UserList
                  imgUrl={taskReporter?.imgUrl}
                  name={taskReporter?.name}
                />
                {showList && isClicked === "reporter" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "reporter")}
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
                  setShowList(true);
                  setIsClicked("reporter");
                }}
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className="bg-gray-700 p-0.5 rounded-full">
                    <UserIcon />
                  </div>
                  <div>None</div>
                </div>
                {showList && isClicked === "reporter" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "reporter")}
                        >
                          <UserList imgUrl={user?.imgUrl} name={user?.name} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center max-lg:flex-col max-lg:items-start gap-2">
            <div className="flex-1">Sprint</div>
            <select
              name="sprint"
              className="flex-1 capitalize text-slate-300 bg-transparent focus:bg-slate-900 hover:bg-slate-900 select mt-2"
              value={selectedSprint}
              onChange={updateTaskIssueHandler}
            >
              <option value={sprint?.id}>{sprint?.title}</option>
              {sprints.length > 0 &&
                sprints
                  .filter((spr) => spr.id !== sprint?.id)
                  .map((spr) => (
                    <option key={spr.id} value={spr.id}>
                      {spr.title}
                    </option>
                  ))}
            </select>
          </div>
          <div className=" flex items-center gap-2">
            <div className="flex-1">Priority</div>
            <select
              className="flex-1 capitalize text-slate-300 bg-transparent focus:bg-slate-900 hover:bg-slate-900 select mt-2"
              name="priority"
              value={selectedPriority}
              onChange={updateTaskIssueHandler}
            >
              <option value={priority}>{priority}</option>
              {priorities
                .filter((pr) => pr.priority !== priority)
                .map((pr) => (
                  <option key={pr.id} value={pr.priority}>
                    {pr.priority}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
            <div className="flex-1">Reviewer</div>
            {taskViewer ? (
              <div
                className="flex-1 max-[1050px]:w-full relative cursor-default"
                onClick={() => {
                  setShowList(!showList);
                  setIsClicked("viewer");
                }}
              >
                <UserList imgUrl={taskViewer?.imgUrl} name={taskViewer?.name} />
                {showList && isClicked === "viewer" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "viewer")}
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
                  setIsClicked("viewer");
                }}
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className="bg-gray-700 p-0.5 rounded-full">
                    <UserIcon />
                  </div>
                  <div>None</div>
                </div>
                {showList && isClicked === "viewer" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "viewer")}
                        >
                          <UserList imgUrl={user?.imgUrl} name={user?.name} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
            <div className="flex-1">QA</div>
            {taskQa ? (
              <div
                className="flex-1 max-[1050px]:w-full relative cursor-default"
                onClick={() => {
                  setShowList(!showList);
                  setIsClicked("qa");
                }}
              >
                <UserList imgUrl={taskQa?.imgUrl} name={taskQa?.name} />
                {showList && isClicked === "qa" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "qa")}
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
                  setIsClicked("qa");
                }}
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className="bg-gray-700 p-0.5 rounded-full">
                    <UserIcon />
                  </div>
                  <div>None</div>
                </div>
                {showList && isClicked === "qa" && (
                  <div className="flex flex-col gap-3 bg-slate-900 w-full absolute z-10 p-2 mt-2">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div
                          key={user?.id}
                          onClick={() => updateUsersHandler(user, "qa")}
                        >
                          <UserList imgUrl={user?.imgUrl} name={user?.name} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {!isTask && (
            <>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">Label</div>
                <select
                  className="flex-1 capitalize text-slate-300 bg-transparent focus:bg-slate-900 hover:bg-slate-900 select"
                  name="label"
                  value={selectedLabel}
                  onChange={updateIssueLabelTypeHandler}
                >
                  <option value={label}>{label}</option>
                  {issueLabel
                    .filter((lb) => lb.label !== label)
                    .map((lb) => (
                      <option key={lb.id} value={lb.label}>
                        {lb.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" flex items-center gap-2">
                <div className="flex-1">Type</div>
                <select
                  className="flex-1 capitalize text-slate-300 bg-transparent focus:bg-slate-900 hover:bg-slate-900 select"
                  name="issueType"
                  value={selectedType}
                  onChange={updateIssueLabelTypeHandler}
                >
                  <option value={issueType}>{issueType}</option>
                  {issueTypes
                    .filter((ty) => ty.type !== issueType)
                    .map((ty) => (
                      <option key={ty.id} value={ty.type}>
                        {ty.type}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel2;
