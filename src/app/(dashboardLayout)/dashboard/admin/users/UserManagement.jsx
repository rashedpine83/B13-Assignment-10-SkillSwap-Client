"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import UserStatusButton from "./UserStatusButton";

export default function UserManagement({ users }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ? true : user?.role?.toLowerCase() === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="p-6 pt-15 lg:pt-6 ">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent pb-3">
          User Management
        </h1>

        <p className="text-gray-500 mt-2">{filteredUsers.length} total users</p>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-xl
            bg-white
            border
            border-slate-200
            outline-none
            focus:ring-2
            focus:ring-purple-500
            "
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="
          px-5
          py-3
          rounded-xl
          border
          border-slate-200
          bg-white
          outline-none
          focus:ring-2
          focus:ring-cyan-500
          "
        >
          <option value="all">All Roles</option>

          <option value="admin">Admin</option>

          <option value="client">Client</option>

          <option value="freelancer">Freelancer</option>
        </select>
      </div>

      {/* User Table */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-200
        overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="
              bg-gradient-to-r
              from-purple-50
              via-cyan-50
              to-orange-50
              "
            >
              <tr className="text-left">
                <th className="p-5">User</th>

                <th className="p-5">Role</th>

                <th className="p-5">Status</th>

                <th className="p-5">Joined</th>

                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="
                  border-t
                  hover:bg-slate-50
                  transition
                  "
                >
                  {/* USER */}

                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                        h-12
                        w-12
                        rounded-full
                        bg-gradient-to-r
                        from-purple-500
                        via-cyan-500
                        to-orange-500
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        "
                      >
                        {getInitials(user.name)}
                      </div>

                      <div>
                        <h3 className="font-semibold">{user.name}</h3>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}

                  <td className="p-5">
                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-cyan-100
                      text-cyan-700
                      text-xs
                      font-medium
                      "
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="p-5">
                    {user.status === "Blocked" ? (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-red-100
                        text-red-600
                        text-xs
                        font-medium
                        "
                      >
                        Blocked
                      </span>
                    ) : (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-600
                        text-xs
                        font-medium
                        "
                      >
                        Active
                      </span>
                    )}
                  </td>

                  {/* JOIN DATE */}

                  <td className="p-5 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* ACTIONS */}

                  <td className="p-5">
                    <div className="flex justify-end">
                      <UserStatusButton
                        email={user.email}
                        status={user.status}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                    text-center
                    py-10
                    text-gray-500
                    "
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
