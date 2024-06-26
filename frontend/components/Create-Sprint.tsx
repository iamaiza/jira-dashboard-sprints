"use client";
import { SprintProps } from "@/types/types";
import { CREATE_SPRINT, SPRINTS } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import { ChangeEvent, MouseEvent, useState } from "react";

const CreateSprintModal = ({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusCheck, setStatusCheck] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [createSprintMutation] = useMutation(CREATE_SPRINT, {
    refetchQueries: [{ query: SPRINTS }],
    onCompleted: () => {
      setShowModal(false)
    }
  });

  const statusCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setStatusCheck((prevStatus) => [...prevStatus, value]);
    } else
      setStatusCheck((prevStatus) =>
        prevStatus.filter((status) => status !== value)
      );
  };

  const createSprintHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      if (statusCheck.length <= 0) {
        setError("Please select at least one status");
        return;
      }
      const endDate = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString();
       
      const { data } = await createSprintMutation({
        variables: {
          data: {
            title,
            description,
            status: statusCheck,
            startDate: new Date(Date.now()).toISOString(),
            endDate,
          },
        },
      });
      // setShowModal(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-slate-800 top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 z-30 max-w-lg w-full p-5 rounded">
      <form className="w-full" onSubmit={createSprintHandler}>
        <input
        className="text-slate-200"
          type="text"
          name="title"
          placeholder="Sprint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="mb-0.5 text-slate-200"
          rows={5}
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="to-do"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("to-do")}
          />
          <span className="text-slate-300">To-Do</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="blocked"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("blocked")}
          />
          <span className="text-slate-300">Blocked</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="in progress"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("in progress")}
          />
          <span className="text-slate-300">In Progress</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="awaiting qa"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("awaiting qa")}
          />
          <span className="text-slate-300">Awaiting QA</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="in qa"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("in qa")}
          />
          <span className="text-slate-300">In QA</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="won't do"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("won't do")}
          />
          <span className="text-slate-300">Won't Do</span>
        </div>
        <div className="flexStart gap-2 mb-2">
          <input
            className="w-fit mb-0 accent-sky-900"
            type="checkbox"
            value="completed"
            onChange={statusCheckHandler}
            checked={statusCheck.includes("completed")}
          />
          <span className="text-slate-300">Completed</span>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="bg-sky-900 text-white w-full py-2 px-3 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSprintModal;
