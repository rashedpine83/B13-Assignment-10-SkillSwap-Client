"use client";

import {
  Users,
  ClipboardList,
  DollarSign,
  Activity,
  CreditCard,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminChart({ payments, tasks, users }) {
  // Normalize task status
  const normalizedTasks = tasks.map((task) => ({
    ...task,
    status: task.status?.trim().toLowerCase(),
  }));

  // Revenue calculation FIXED
  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );

  // Users
  const clients = users.filter(
    (u) => u.role?.toLowerCase() === "client",
  ).length;

  const freelancers = users.filter(
    (u) => u.role?.toLowerCase() === "freelancer",
  ).length;

  const admins = users.filter((u) => u.role?.toLowerCase() === "admin").length;

  // Tasks
  const openTasks = normalizedTasks.filter(
    (t) => t.status === "open" || t.status === "pending",
  ).length;

  const completedTasks = normalizedTasks.filter(
    (t) => t.status === "completed",
  ).length;

  const activeTasks = normalizedTasks.filter(
    (t) => t.status === "in progress",
  ).length;

  const roleData = [
    {
      name: "Admin",
      value: admins,
    },
    {
      name: "Client",
      value: clients,
    },
    {
      name: "Freelancer",
      value: freelancers,
    },
  ];

  const taskData = [
    {
      status: "Open",
      count: openTasks,
    },
    {
      status: "Completed",
      count: completedTasks,
    },
    {
      status: "In Progress",
      count: activeTasks,
    },
  ];

  const pieColors = ["#7C3AED", "#06B6D4", "#F97316"];

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      subtitle: `${admins} admin, ${freelancers} freelancers, ${clients} clients`,
      icon: Users,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      subtitle: `${activeTasks} active`,
      icon: ClipboardList,
      color: "from-cyan-500 to-cyan-700",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      subtitle: `${payments.length} payments`,
      icon: DollarSign,
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Active Tasks",
      value: activeTasks,
      subtitle: "Currently in progress",
      icon: Activity,
      color: "from-purple-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-15 lg:pt-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">Platform overview and management</p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
              bg-white
              p-6
              rounded-3xl
              border
              shadow-sm
              hover:-translate-y-2
              hover:shadow-xl
              transition-all
              duration-300
              "
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-2">{item.value}</h2>

                  <p className="text-xs text-gray-400 mt-3">{item.subtitle}</p>
                </div>

                <div
                  className={`
                  h-14
                  w-14
                  rounded-2xl
                  bg-gradient-to-r
                  ${item.color}
                  flex
                  justify-center
                  items-center
                  `}
                >
                  <Icon className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="font-bold text-xl mb-6">Users by Role</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
              >
                {roleData.map((_, index) => (
                  <Cell key={index} fill={pieColors[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="font-bold text-xl mb-6">Tasks by Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskData}>
              <XAxis dataKey="status" />
              <YAxis />

              <Tooltip
                formatter={(value) => [value, "Count"]}
                labelFormatter={(label) => `Status: ${label}`}
              />

              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                <Cell fill="#F97316" />
                <Cell fill="#06B6D4" />
                <Cell fill="#7C3AED" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payments */}

      <div className="bg-white p-6 rounded-3xl shadow-sm mt-8">
        <h2 className="font-bold text-xl mb-6">Recent Payments</h2>

        <div className="space-y-4">
          {payments.slice(0, 5).map((payment) => (
            <div
              key={payment._id}
              className="
              p-4
              border
              rounded-2xl
              flex
              justify-between
              items-center
              hover:bg-gray-50
              transition
              "
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex justify-center items-center">
                  <CreditCard className="text-purple-600" />
                </div>

                <div>
                  <h3 className="font-semibold">{payment.taskTitle}</h3>

                  <p className="text-sm text-gray-500">
                    {payment.clientEmailId}
                    {" → "}
                    {payment.freelancerEmailId}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h3 className="font-bold text-green-600">
                  ${Number(payment.price)}
                </h3>

                <p className="text-sm text-gray-400">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
