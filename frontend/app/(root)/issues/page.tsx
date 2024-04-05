"use client";

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ISSUES } from "@/utils/query-mutations";
import { IssueProps } from "@/types/types";
import Link from "next/link";

const Issues = () => {
  const { data } = useQuery(ISSUES);
  const [issues, setIssues] = useState<IssueProps[]>([]);
  console.log(issues);
  useEffect(() => {
    if (data?.issues) setIssues(data.issues);
  }, [data?.issues]);

  return (
    <div className="max-md:overflow-x-auto min-h-[87vh]">
      {issues.length > 0 && (
        <table className="w-full max-md:w-[47rem] text-sm">
          <thead>
            <tr>
              <th className="px-1 py-2">Id</th>
              <th className="px-1 py-2">Type</th>
              <th className="px-1 py-2">Project</th>
              <th className="px-1 py-2">Assignee</th>
              <th className="px-1 py-2">Reporter</th>
              <th className="px-1 py-2">Reviewer</th>
              <th className="px-1 py-2">QA</th>
              <th className="px-1 py-2">Sprint</th>
              <th className="px-1 py-2">Status</th>
              <th className="px-1 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {issues?.map((issue) => (
              <tr>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  <Link href={`/issues/${issue?.id}`}>{issue?.issueType}</Link>
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.taskId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.assigneeId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.reporterId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.viewerId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.qaId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.sprintId?.id}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.status}
                </td>
                <td className="text-center capitalize py-1.5 px-1 border-b border-slate-800">
                  {issue?.priority}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Issues;
