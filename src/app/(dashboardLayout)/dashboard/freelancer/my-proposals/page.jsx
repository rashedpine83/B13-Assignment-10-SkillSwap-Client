import { FiFileText, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { getProposalsByEmail } from "@/lib/api/proposals";
import { getUserSession } from "@/lib/core/session";

export default async function MyProposalsPage() {
  const user = await getUserSession();

  const res = await getProposalsByEmail(user?.email);
  console.log("freelancer", res);

  const proposals = res || [];

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Proposals</h1>
          <p className="text-gray-500 text-sm">
            {proposals.length} proposal submitted
          </p>
        </div>
      </div>

      {/* RECENT PROPOSALS */}
      <div className="mt-8">
        {proposals.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <FiFileText className="mx-auto text-gray-400 mb-3" size={30} />
            <h3 className="font-semibold">No proposals yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Browse tasks and submit your first proposal
            </p>

            <Link
              href="/browse-tasks"
              className="inline-block mt-4 px-5 py-2 rounded-xl text-white
              bg-gradient-to-r from-cyan-500 to-purple-600"
            >
              Browse Tasks
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <h3
                className="
      text-2xl
      font-bold
      bg-gradient-to-r
      from-cyan-500
      via-purple-600
      to-orange-500
      bg-clip-text
      text-transparent
      "
              >
                {p.taskTitle}
              </h3>

              {/* Budget + Days */}
              <div className="flex gap-3 flex-wrap">
                <span
                  className="
        px-4 py-2
        rounded-full
        bg-cyan-50
        text-cyan-700
        text-sm
        font-medium
        "
                >
                  💰 ${p.proposedBudget}
                </span>

                <span
                  className="
        px-4 py-2
        rounded-full
        bg-purple-50
        text-purple-700
        text-sm
        font-medium
        "
                >
                  ⏳ {p.estimatedDays} Days
                </span>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-400">
                Created:{" "}
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm
      ${
        p.status === "pending"
          ? "bg-orange-100 text-orange-700"
          : p.status === "accepted" || p.status === "In Progress"
            ? "bg-cyan-100 text-cyan-700"
            : "bg-purple-100 text-purple-700"
      }
    `}
            >
              {p.status === "In Progress" ? "Accepted" : p.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
