"use client";

import { UserIcon } from "@/icons/icons";
import UserList from "./UserList";
import {
  issueLabel,
  issueStatuses,
  issueTypes,
  priorities,
} from "@/utils/issues";
import { Detail2Props, SprintProps, User } from "@/types/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  SPRINTS,
  UPDATE_ISSUE_LABEL_TYPE,
  UPDATE_TASK_ISSUE,
  UPDATE_TASK_STATUS,
  USERS,
  UPDATE_TASK_USERS,
} from "@/utils/query-mutations";
import TaskUsers from "./TaskUsers";

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
  const [isClicked, setIsClicked] = useState("");
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

  const updateUsersHandler = async (user: User | null, userType: string) => {
    if (userType === "assignee") {
      if (user === null) setTaskAssignee(null);
      else setTaskAssignee(user);
    }
    if (userType === "reporter") {
      if (user === null) setTaskReporter(null);
      else setTaskReporter(user);
    }
    if (userType === "viewer") {
      if (user === null) setTaskViewer(null);
      else setTaskViewer(user);
    }
    if (userType === "qa") {
      if (user === null) setTaskQa(null);
      else setTaskQa(user);
    }

    const { data } = await updateUsersMutation({
      variables: {
        data: {
          id: task?.id,
          assigneeId:
            userType === "assignee"
              ? user
                ? user?.id
                : null
              : taskAssginee?.id,
          reporterId:
            userType === "reporter"
              ? user
                ? user?.id
                : null
              : taskReporter?.id,
          viewerId:
            userType === "viewer" ? (user ? user?.id : null) : taskViewer?.id,
          qaId: userType === "qa" ? (user ? user?.id : null) : taskQa?.id,
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
          {sprint?.status
            .filter((st) => st != status.toLowerCase())
            .map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
        </select>
      </div>
      <div className="border border-slate-800 py-3">
        <div className="border-b border-slate-800 pb-3 px-3">Details</div>
        <div className="px-3 pt-5 text-sm">
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2">
            <div className="flex-1">Assignee</div>
            <TaskUsers
              user={taskAssginee}
              showList={showList}
              setShowList={setShowList}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              users={users}
              updateUsersHandler={updateUsersHandler}
              selectedUser="assignee"
            />
          </div>
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
            <div className="flex-1">Reporter</div>
            <TaskUsers
              user={taskReporter}
              showList={showList}
              setShowList={setShowList}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              users={users}
              updateUsersHandler={updateUsersHandler}
              selectedUser="reporter"
            />
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
            <TaskUsers
              user={taskViewer}
              showList={showList}
              setShowList={setShowList}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              users={users}
              updateUsersHandler={updateUsersHandler}
              selectedUser="viewer"
            />
          </div>
          <div className="flex items-center max-[1050px]:flex-col max-[1050px]:items-start gap-2 mt-5">
            <div className="flex-1">QA</div>
            <TaskUsers
              user={taskQa}
              showList={showList}
              setShowList={setShowList}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              users={users}
              updateUsersHandler={updateUsersHandler}
              selectedUser="qa"
            />
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
