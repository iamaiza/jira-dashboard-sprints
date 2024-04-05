import { XIcon } from "@/icons/icons";
import { SprintProps, TaskProps, User } from "@/types/types";
import { issueLabel, issueStatuses, issueTypes } from "@/utils/issues";
import {
  CREATE_ISSUE,
  ISSUES,
  SPRINTS,
  TASKS,
  USERS,
} from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import DescCommentInput from "./desc-comment-input";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";

const CreateIssueModal = ({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) => {
  const { data: tasksData } = useQuery(TASKS);
  const { data: usersData } = useQuery(USERS);
  const { data: sprintData } = useQuery(SPRINTS);
  const [description, setDescription] = useState("");
  const [state, setState] = useState(() => ({
    projectName: tasksData?.tasks[0].id || "1",
    issueType: "story",
    status: "to-do",
    summary: "",
    attachment: "" as string | ArrayBuffer | null,
    assignee: usersData?.users[0].id || "1",
    reporter: usersData?.users[0].id || "1",
    reviewer: usersData?.users[0].id || "1",
    qa: usersData?.users[0].id || "1",
    sprint: sprintData?.sprints[0].id || "1",
    label: "",
    priority: "high",
  }));
  const [createIssueMutation] = useMutation(CREATE_ISSUE, {
    refetchQueries: [{ query: ISSUES }],
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const handleChange = (value: string) => {
    setDescription(value);
  };
  const reporterInputChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "reporter") {
      setState((prevState) => ({
        ...prevState,
        reporter: value,
      }));
    }
    if (name === "reviewer") {
      setState((prevState) => ({
        ...prevState,
        reviewer: value,
      }));
    }
    if (name === "qa") {
      setState((prevState) => ({
        ...prevState,
        qa: value,
      }));
    }
  };
  const inputChangeHandler = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const selectedTask = tasksData?.tasks.find(
      (task: TaskProps) => task.id === value
    );
    if (selectedTask) {
      setState((prevState) => ({
        ...prevState,
        assignee: selectedTask?.assigneeId?.id,
        sprint: selectedTask?.sprintId?.id,
        priority: selectedTask?.priority,
      }));
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setState((prevState) => ({
          ...prevState,
          attachment: e.target?.result as string | ArrayBuffer,
        }));
      };

      reader.readAsDataURL(file);

      // const fileURL = URL.createObjectURL(file);
      // setState((prevState) => ({
      //   ...prevState,
      //   attachment: fileURL,
      // }));
    }
  };
  const selectFileFromLSHandler = () => {
    fileRef.current?.click();
  };

  const createIssueHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !state.projectName.trim() ||
        !state.issueType.trim() ||
        !state.status.trim() ||
        !state.assignee.trim() ||
        !state.sprint.trim() ||
        !state.reporter.trim() ||
        !state.reviewer.trim() ||
        !state.qa.trim() ||
        !state.summary.trim()
      ) {
        alert("Fields are required");
        return;
      }
      const { data } = await createIssueMutation({
        variables: {
          data: {
            taskId: state.projectName,
            issueType: state.issueType,
            status: state.status,
            summary: state.summary,
            description: description,
            attachment: state.attachment,
            assigneeId: state.assignee,
            reporterId: state.reporter,
            viewerId: state.reviewer,
            qaId: state.qa,
            sprintId: state.sprint,
            label: state.label,
            priority: state.priority,
          },
        },
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-800 top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 z-30 max-w-3xl w-full p-5 rounded max-h-[32rem] h-full overflow-auto">
      <div className="flexBetween mb-8">
        <span className="font-semibold text-xl">Create Issue</span>
        <div onClick={() => setShowModal(false)}>
          <XIcon className="w-5 h-5 stroke-slate-740" />
        </div>
      </div>
      <p className="text-sm">
        Required fields are marked with asterrisk{" "}
        <span className="text-red-400">*</span>
      </p>
      <form className="text-sm mt-5" onSubmit={createIssueHandler}>
        <div className="w-1/2 flex flex-col gap-1.5">
          <label htmlFor="p-name">
            Project Name <span className="text-red-400">*</span>
          </label>
          <select
            className="capitalize text-slate-400"
            id="p-name"
            name="projectName"
            value={state.projectName}
            onChange={inputChangeHandler}
          >
            {tasksData?.tasks.map((task: TaskProps) => (
              <option value={task.id}>{task.title}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5">
          <label htmlFor="issue-type">
            Issue type <span className="text-red-400">*</span>
          </label>
          <select
            className="capitalize text-slate-400"
            id="issue-type"
            name="issueType"
            value={state.issueType}
            onChange={inputChangeHandler}
          >
            {issueTypes.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-slate-700 mt-2.5 mb-4" />
        <div className="w-1/2 flex flex-col gap-1.5">
          <label htmlFor="status">Status</label>
          <select
            className="uppercase text-xs text-slate-400"
            id=""
            name="status"
            value={state.status}
            onChange={inputChangeHandler}
          >
            <option value="to-do">To-Do</option>
            {issueStatuses.map((status) => (
              <option key={status.id} value={status.status}>
                {status.status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="">
            Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            className="text-slate-400"
            name="summary"
            value={state.summary}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="">Attachment</label>
          <div className="border border-slate-600 min-h-32 rounded flexCenter gap-1 p-2">
            {!state.attachment && (
              <>
                Drop files to attach or
                <span
                  className="text-sky-700 cursor-pointer"
                  onClick={selectFileFromLSHandler}
                >
                  browse
                </span>
                <input
                  className="bg-transparent border hidden"
                  type="file"
                  ref={fileRef}
                  onChange={handleFileChange}
                />
              </>
            )}

            {state.attachment && typeof state.attachment === "string" && (
              <div>
                {state.attachment.toLowerCase().includes(".pdf") ? (
                  <embed
                    src={state.attachment}
                    type="application/pdf"
                    width="100%"
                    height="50px"
                  />
                ) : (
                  <img className="h-32" src={state.attachment} alt="" />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <label htmlFor="">Description</label>
          <DescCommentInput state={description} handleChange={handleChange} />
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-7">
          <label htmlFor="">Assignee</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="assignee"
            value={state.assignee}
            onChange={inputChangeHandler}
          >
            {usersData?.users.map((usr: User) => (
              <option value={usr.id}>{usr.name}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">Reporter</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="reporter"
            value={state.reporter}
            onChange={reporterInputChangeHandler}
          >
            {usersData?.users.map((usr: User) => (
              <option value={usr.id}>{usr.name}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">Reviewer</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="reviewer"
            value={state.reviewer}
            onChange={reporterInputChangeHandler}
          >
            {usersData?.users.map((usr: User) => (
              <option value={usr.id}>{usr.name}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">QA</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="qa"
            value={state.qa}
            onChange={reporterInputChangeHandler}
          >
            {usersData?.users.map((usr: User) => (
              <option value={usr.id}>{usr.name}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">Sprint</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="sprint"
            value={state.sprint}
            onChange={inputChangeHandler}
          >
            {sprintData?.sprints.map((sprint: SprintProps) => (
              <option value={sprint.id}>{sprint.title}</option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">Label</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="label"
            value={state.label}
            onChange={inputChangeHandler}
          >
            {issueLabel.map((label) => (
              <option key={label.id} value={label.label}>
                {label.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1.5 mt-3">
          <label htmlFor="">Priority</label>
          <select
            className="capitalize text-slate-400"
            id=""
            name="priority"
            value={state.priority}
            onChange={inputChangeHandler}
          >
            <option value="high">High</option>
            <option value="highest">Highest</option>
            <option value="major">Major</option>
          </select>
        </div>
        <div className="text-sm flex justify-end items-center gap-2 mt-3">
          <button className="bg-gray-700 py-1.5 px-3">Cancel</button>
          <button className="bg-sky-900 py-1.5 px-3">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssueModal;
