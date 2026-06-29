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
          <div
            className="
  grid
  grid-cols-1
  lg:grid-cols-2
  gap-5
  "
          >
            {proposals.map((p) => (
              <div
                key={p._id}
                className="
      bg-white
      border
      border-gray-100
      rounded-2xl
      p-5
      flex
      justify-between
      items-start
      hover:shadow-lg
      hover:border-purple-200
      transition-all
      duration-300
      "
              >
                {/* LEFT CONTENT */}
                <div>
                  {/* Title */}
                  <h3
                    className="
          font-bold
          text-2xl
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
                  <p className="text-sm text-gray-500 mt-2">
                    Budget:
                    <span className="font-medium text-cyan-600">
                      {" "}
                      ${p.proposedBudget}
                    </span>
                    {" • "}
                    <span className="text-purple-600">
                      {p.estimatedDays} days
                    </span>
                  </p>

                  {/* Created Date */}
                  <p className="text-xs text-gray-400 mt-2">
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

                {/* STATUS */}
                <span
                  className={`text-xs px-4 py-2 rounded-full font-medium

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
