"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  FiSearch,
  FiFilter,
  FiDollarSign,
  FiCalendar,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";

export default function BrowseTasksClient({ tasks }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const categories = [
    "all",
    ...new Set(safeTasks.map((task) => task.category)),
  ];

  const filteredTasks = useMemo(() => {
    return safeTasks.filter((task) => {
      const titleMatch = task?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "all" ? true : task.category === category;

      return titleMatch && categoryMatch;
    });
  }, [safeTasks, search, category]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}

      <div className="mb-10 text-center">
        <h1
          className="
          text-4xl
          md:text-5xl
          font-extrabold
          bg-gradient-to-r
          from-purple-600
          via-cyan-500
          to-orange-400
          bg-clip-text
          text-transparent
          "
        >
          Browse Tasks
        </h1>

        <p className="text-gray-500 mt-3">
          Discover freelance opportunities that match your skills
        </p>
      </div>

      {/* Search + Filter */}

      <div
        className="
        bg-white
        rounded-3xl
        p-5
        shadow-md
        border
        border-slate-100
        mb-10
        flex
        flex-col
        md:flex-row
        gap-4
        "
      >
        <div className="relative flex-1">
          <FiSearch
            size={18}
            className="
            absolute
            left-4
            top-4
            text-gray-400
            "
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search tasks..."
            className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-xl
            border
            border-slate-200
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            "
          />
        </div>

        <div className="relative">
          <FiFilter
            className="
            absolute
            left-4
            top-4
            text-gray-400
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
            pl-10
            pr-8
            py-3
            rounded-xl
            border
            border-slate-200
            outline-none
            focus:ring-2
            focus:ring-purple-500
            "
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="
          px-6
          py-3
          rounded-xl
          text-white
          font-medium
          bg-gradient-to-r
          from-cyan-500
          via-purple-500
          to-orange-400
          hover:scale-105
          transition
          "
        >
          Reset
        </button>
      </div>

      {/* count */}

      <p className="text-gray-500 mb-6">
        {filteredTasks.length} tasks available
      </p>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            onClick={() => router.push(`/browse-tasks/${task._id}`)}
            className="
            group
            relative
            overflow-hidden
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-6
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-500
            cursor-pointer
            "
          >
            {/* top gradient */}

            <div
              className="
              absolute
              top-0
              left-0
              h-2
              w-full
              bg-gradient-to-r
              from-purple-600
              via-cyan-500
              to-orange-400
              "
            />

            {/* top */}

            <div className="flex justify-between items-center">
              <span
                className="
                px-3
                py-1
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs
                font-semibold
                "
              >
                {task.category}
              </span>

              <span
                className="
                px-3
                py-1
                rounded-full
                bg-green-100
                text-green-600
                text-xs
                "
              >
                {task.status}
              </span>
            </div>

            {/* title */}

            <h2
              className="
              mt-5
              text-xl
              font-bold
              text-slate-800
              group-hover:text-transparent
              group-hover:bg-clip-text
              group-hover:bg-gradient-to-r
              group-hover:from-cyan-500
              group-hover:to-purple-600
              "
            >
              {task.title}
            </h2>

            {/* description */}

            <p className="mt-3 text-gray-500 line-clamp-3">
              {task.description}
            </p>

            {/* skills */}

            <div className="flex flex-wrap gap-2 mt-5">
              {task.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-cyan-50
                    text-cyan-700
                    text-xs
                    font-medium
                    "
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* footer */}

            <div
              className="
              mt-6
              pt-5
              border-t
              flex
              justify-between
              items-center
              "
            >
              <div>
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-cyan-600
                  font-bold
                  text-lg
                  "
                >
                  <FiDollarSign />
                  {task.budget}
                </div>

                <p className="text-xs text-gray-400">Budget</p>
              </div>

              <div className="text-right">
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  justify-end
                  text-orange-500
                  "
                >
                  <FiCalendar />

                  <span className="text-sm">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-gray-400">Deadline</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div
          className="
          mt-20
          text-center
          bg-white
          p-10
          rounded-3xl
          border
          "
        >
          <FiBriefcase size={40} className="mx-auto text-gray-300" />

          <h3 className="mt-4 text-xl font-bold">No Tasks Found</h3>

          <p className="text-gray-500 mt-2">Try another search or category</p>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiFilter, FiDollarSign } from "react-icons/fi";

// export default function BrowseTasksClient({ tasks }) {
//   const router = useRouter();

//   const [search, setSearch] = useState("");

//   const [category, setCategory] = useState("all");

//   const categories = [
//     "all category",
//     ...new Set(tasks?.map((task) => task.category)),
//   ];

//   const filteredTasks = useMemo(() => {
//     return tasks.filter((task) => {
//       const titleMatch = task.title
//         ?.toLowerCase()
//         .includes(search.toLowerCase());

//       const categoryMatch =
//         category === "all" ? true : task.category === category;

//       return titleMatch && categoryMatch;
//     });
//   }, [tasks, search, category]);

//   const resetFilters = () => {
//     setSearch("");
//     setCategory("all");
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {/* Header */}

//       <h1 className="text-4xl font-bold bg-linear-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
//         Browse Tasks
//       </h1>

//       <p className="text-gray-500 mt-2">
//         Find open tasks that match your skills
//       </p>

//       {/* Search + Filter */}

//       <div className="mt-8 flex flex-col md:flex-row gap-4">
//         {/* Search */}

//         <div className="relative flex-1">
//           <FiSearch className="absolute left-4 top-4 text-gray-400" />

//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             placeholder="Search tasks by title..."
//             className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-cyan-400"
//           />
//         </div>

//         {/* Filter */}

//         <div className="relative">
//           <FiFilter className="absolute left-4 top-4 text-gray-400" />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-400"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Reset */}

//         <button
//           onClick={resetFilters}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Count */}

//       <p className="mt-8 text-gray-500">{filteredTasks.length} tasks found</p>

//       {/* Cards */}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTasks.map((task) => (
//           <div
//             key={task._id}
//             onClick={() => router.push(`/browse-tasks/${task._id}`)}
//             className="
//                 group
//                 cursor-pointer
//                 bg-white
//                 border
//                 border-gray-200
//                 rounded-3xl
//                 p-6
//                 transition-all
//                 duration-300
//                 hover:scale-[1.03]
//                 hover:border-cyan-400
//                 hover:shadow-xl
//                 hover:shadow-purple-100
//               "
//           >
//             {/* top */}

//             <div className="flex justify-between">
//               <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
//                 {task.category}
//               </span>

//               <span className="text-sm text-gray-400">
//                 {new Date(task.deadline).toLocaleDateString()}
//               </span>
//             </div>

//             {/* title */}

//             <h2
//               className="
//                 mt-4
//                 text-xl
//                 font-bold
//                 transition-all
//                 duration-300
//                 group-hover:text-transparent
//                 group-hover:bg-clip-text
//                 group-hover:bg-gradient-to-r
//                 group-hover:from-cyan-500
//                 group-hover:to-purple-600
//               "
//             >
//               {task.title}
//             </h2>

//             {/* description */}

//             <p className="mt-3 text-gray-500 line-clamp-2">
//               {task.description}
//             </p>

//             {/* bottom */}

//             <div className="mt-6 flex justify-between items-center">
//               <div className="flex items-center font-bold text-cyan-600">
//                 <FiDollarSign />
//                 {task.budget}
//               </div>

//               <span className="text-xs text-gray-500 truncate max-w-[150px]">
//                 {task.emailId}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
