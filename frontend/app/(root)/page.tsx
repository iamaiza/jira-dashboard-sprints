"use client";

import CreateSprintModal from "@/components/Create-Sprint";
import { SprintProps } from "@/types/types";
import { SPRINTS } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(SPRINTS);
  const sprints = data?.sprints || [];

  const showModalHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <div className="text-end">
        <button
          className="bg-pink-600 text-white px-3 py-2 rounded"
          onClick={showModalHandler}
        >
          Create sprint
        </button>
      </div>
      {showModal && (
        <>
          <div className="backdrop" onClick={() => setShowModal(false)} />
          <CreateSprintModal setShowModal={setShowModal} />
        </>
      )}
      {sprints?.length > 0 && (
        <table className="mt-10 w-full">
          <thead>
            <tr>
              <th className="text-left px-2">Id</th>
              <th className="text-left px-2">Sprint Title</th>
              <th className="text-left px-2">Start Date</th>
              <th className="text-left px-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {sprints?.map((sprint: SprintProps) => (
              <tr>
                <td className="py-2 px-2">{sprint?.id}</td>
                <td className="py-2 px-2">
                  <Link href={`/sprints/${sprint?.id}`}>{sprint?.title}</Link>
                </td>
                <td className="py-2 px-2">
                  {sprint?.startDate.split('T')[0]}
                </td>
                <td className="py-2 px-2">
                  {sprint?.endDate.split('T')[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
