import {
  ClipboardList,
  Clock3,
  CircleDollarSign,
  CheckCircle,
} from "lucide-react";

import { FiFileText, FiSearch } from "react-icons/fi";
import Link from "next/link";

import { getUserSession } from "@/lib/core/session";
import { getProposalsByEmail } from "@/lib/api/proposals";
import { getPaymentsByEmail } from "@/lib/api/payment";

export default async function FreelancerOverview() {
  const user = await getUserSession();

  const emailId = user?.email;

  const res = await getProposalsByEmail(user?.email);

  const paymentData = await getPaymentsByEmail(user?.email);

  console.log("paymentData:", paymentData);
  console.log("isArray:", Array.isArray(paymentData));

  const proposals = res || [];

  // ===== STATS =====

  const totalProposals = proposals.length;

  const pendingProposals = proposals.filter(
    (p) => p.status === "pending",
  ).length;

  const acceptedProposals = proposals.filter(
    (p) => p.status === "accepted" || p.status === "In Progress",
  ).length;

  // Current freelancer payments

  const freelancerPayments =
    paymentData?.filter((payment) => payment?.freelancerEmailId === emailId) ||
    [];

  // Total earned

  const totalEarned =
    freelancerPayments.reduce(
      (sum, payment) => sum + Number(payment?.price || 0),
      0,
    ) || 0;

  // Stats cards

  const stats = [
    {
      title: "Total Proposals",
      value: totalProposals,
      desc: "All proposals submitted",
      icon: ClipboardList,
    },
    {
      title: "Pending",
      value: pendingProposals,
      desc: "Waiting for response",
      icon: Clock3,
    },
    {
      title: "Accepted",
      value: acceptedProposals,
      desc: "Approved proposals",
      icon: CheckCircle,
    },
    {
      title: "Earned",
      value: `$${totalEarned}`,
      desc: "Total earnings received",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="container p-10">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Freelancer Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track your proposals and earnings
          </p>
        </div>

        <Link
          href="/browse-tasks"
          className="
          flex items-center gap-2 px-4 py-2 rounded-xl
          text-white text-sm font-medium
          bg-gradient-to-r from-cyan-500 to-purple-600
          hover:scale-105 transition"
        >
          <FiSearch />
          Browse Tasks
        </Link>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-100
              shadow-md
              hover:shadow-xl
              hover:-translate-y-2
              transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-2">{item.value}</h2>

                  <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
                </div>

                <div
                  className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-100
                  to-purple-100
                  flex
                  items-center
                  justify-center"
                >
                  <Icon size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT PROPOSALS */}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Proposals</h2>

        {proposals.length === 0 ? (
          <div
            className="
    relative overflow-hidden
    bg-white
    border border-purple-100
    rounded-3xl
    p-12
    text-center
    shadow-lg
    "
          >
            {/* Top Gradient Line */}
            <div
              className="
      absolute top-0 left-0
      w-full h-2
      bg-gradient-to-r
      from-cyan-500
      via-purple-500
      to-orange-500
      "
            />

            {/* Icon */}
            <div
              className="
      w-20 h-20 mx-auto mb-5
      rounded-full
      flex items-center justify-center
      bg-gradient-to-r
      from-cyan-100
      via-purple-100
      to-orange-100
      "
            >
              <FiFileText size={35} className="text-purple-600" />
            </div>

            <h3 className="font-bold text-2xl text-gray-800">
              No Proposals Yet
            </h3>

            <p className="text-gray-500 mt-3">
              Browse available tasks and submit your first proposal
            </p>

            <Link
              href="/browse-tasks"
              className="
      inline-flex
      items-center
      gap-2
      mt-7
      px-6
      py-3
      rounded-2xl
      text-white
      font-medium
      shadow-lg
      bg-gradient-to-r
      from-cyan-500
      via-purple-600
      to-orange-500
      hover:scale-105
      transition
      duration-300
      "
            >
              Browse Tasks →
            </Link>
          </div>
        ) : (
          <div
            className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-6
    "
          >
            {proposals.slice(0, 5).map((p) => (
              <div
                key={p._id}
                className="
        group
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        relative
        overflow-hidden
        "
              >
                {/* Hover Gradient Overlay */}
                <div
                  className="
          absolute
          top-0
          left-0
          w-1.5
          h-full
          bg-gradient-to-b
          from-cyan-500
          via-purple-500
          to-orange-500
          "
                />

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
