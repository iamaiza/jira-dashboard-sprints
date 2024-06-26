import { EllipseIcon } from "@/icons/icons";
import { SprintProps, User } from "@/types/types";
import { CREATE_TASK, SPRINTS, TASKS, USERS } from "@/utils/query-mutations";
import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { priorities } from "@/utils/issues"

const CreateTaskModal = ({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery(SPRINTS);
  const { data: usersData } = useQuery(USERS);
  const [sprints, setSprints] = useState<SprintProps[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [state, setState] = useState(() => ({
    title: "",
    desc: "",
    priority: "high",
    fileUrl: "",
    assignee: "none",
    reporter: "none",
    sprint: `${data?.sprints[0]?.id || "1"}`,
  }));
  const [error, setError] = useState("");
  const [createTaskMutation] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: TASKS }],
    onCompleted: () => setShowModal(false),
  });

  useEffect(() => {
    if (data?.sprints) setSprints(data.sprints);
    if (usersData?.users) setUsers(usersData.users);
  }, [data?.sprints, usersData?.users]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setState((prevState) => ({
        ...prevState,
        fileUrl: fileURL,
      }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectFileFromLSHandler = () => {
    fileRef.current?.click();
  };

  const createTaskHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log(state.assignee);

    try {
      if (
        !state.title.trim() ||
        !state.sprint.trim() ||
        !state.assignee.trim() ||
        !state.priority.trim()
      ) {
        setError("Fields must not be empty");
        return;
      }

      const { data } = await createTaskMutation({
        variables: {
          data: {
            title: state.title,
            description: state.desc,
            attachment: state.fileUrl,
            priority: state.priority,
            assigneeId: state.assignee,
            sprintId: state.sprint,
            status: "to-do",
          },
        },
      });
      console.log(data?.createTask);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-slate-800 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 max-w-lg w-full p-5 rounded">
      <form className="w-full mt-7" onSubmit={createTaskHandler}>
        <input
          className="text-slate-300"
          type="text"
          name="title"
          placeholder="Task Title"
          value={state.title}
          onChange={handleChange}
        />
        <textarea
          className="text-slate-300"
          name="desc"
          rows={5}
          placeholder="Task Description"
          value={state.desc}
          onChange={handleChange}
        />
        <div className="flexCenter gap-2 mb-2">
          <input
            className="mb-0 text-slate-300"
            type="text"
            name="fileUrl"
            placeholder="Attach any file"
            value={state.fileUrl}
            onChange={handleChange}
          />
          <div
            className="bg-sky-800 py-1 px-2 rounded"
            onClick={selectFileFromLSHandler}
          >
            <EllipseIcon className="w-6 h-6 stroke-white" />
          </div>
          <input
            className=" hidden"
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
          />
        </div>
        <select className="text-slate-300" name="priority" value={state.priority} onChange={handleChange}>
          {priorities.map(pr => (
            <option key={pr.id} value={pr.priority}>{pr.priority}</option>
          ))}
        </select>
        <select className="text-slate-300" name="assignee" value={state.assignee} onChange={handleChange}>
          <option>None</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select className="text-slate-300" name="sprint" value={state.sprint} onChange={handleChange}>
          <option disabled>Sprint</option>
          {sprints.map((spr) => (
            <option key={spr.id} value={spr.id}>
              {spr.title}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="bg-sky-900 text-white w-full mt-2 py-2 px-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTaskModal;
