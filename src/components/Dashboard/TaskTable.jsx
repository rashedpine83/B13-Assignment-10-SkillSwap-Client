"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import DeleteTaskModal from "./DeleteTaskModal";

const TaskTable = ({ tasks }) => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [
    "all",
    "Development",
    "Writing",
    "Marketing",
    "Design",
    "Other",
  ];

  const statuses = ["all", "Open", "In Progress", "Completed"];

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => {
      const categoryMatch =
        categoryFilter === "all" || task.category === categoryFilter;

      const statusMatch =
        statusFilter === "all" || task.status === statusFilter;

      return categoryMatch && statusMatch;
    });
  }, [tasks, categoryFilter, statusFilter]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 pt-15 lg:pt-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Task Management
          </h1>

          <p className="text-slate-500 mt-2">
            {filteredTasks.length} total tasks
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-purple-50 border border-purple-200 px-4 py-3 rounded-xl pr-10 outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-4 text-purple-500"
              size={16}
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-cyan-50 border border-cyan-200 px-4 py-3 rounded-xl pr-10 outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-4 text-cyan-500"
              size={16}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 via-cyan-500 to-orange-500 text-white">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Budget</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => {
              const statusStyle = {
                Open: "bg-cyan-100 text-cyan-700",
                Completed: "bg-purple-100 text-purple-700",
                "In Progress": "bg-orange-100 text-orange-700",
              };

              return (
                <tr key={task._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{task.title}</td>

                  <td className="p-4">{task.category}</td>

                  <td className="p-4">{task.emailId}</td>

                  <td className="p-4">${task.budget}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusStyle[task.status]}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    <DeleteTaskModal taskId={task._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
