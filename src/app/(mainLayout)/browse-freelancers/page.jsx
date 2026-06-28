import { getAllUsers } from "@/lib/api/users";
import { Star } from "lucide-react";

export default async function BrowseFreelancersPage() {
  const users = await getAllUsers();

  // Only freelancer + active users
  const freelancers =
    users?.filter(
      (user) => user?.role === "freelancer" && user?.status === "Active",
    ) || [];

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          Browse Freelancers
        </h1>

        <p className="text-slate-500 mt-3">
          Find skilled professionals for your tasks
        </p>
      </div>

      {/* Empty */}

      {freelancers.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No freelancers found
        </div>
      )}

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {freelancers.map((user) => (
          <div
            key={user._id}
            className="
            group
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-6
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-500
            relative
            overflow-hidden
            "
          >
            {/* Top line */}

            <div
              className="
              absolute
              top-0
              left-0
              w-full
              h-1
              bg-gradient-to-r
              from-purple-600
              via-cyan-500
              to-orange-500
              "
            />

            {/* Avatar */}

            <div className="flex justify-center">
              <div
                className="
                w-20
                h-20
                rounded-full
                bg-gradient-to-br
                from-purple-100
                via-cyan-100
                to-orange-100
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                text-cyan-700
                "
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name */}

            <div className="text-center mt-5">
              <h3 className="font-bold text-lg">{user.name}</h3>

              <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                {user.bio || "No bio available"}
              </p>
            </div>

            {/* Skills */}

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    border

                    ${
                      index % 3 === 0
                        ? "bg-purple-50 border-purple-200 text-purple-600"
                        : index % 3 === 1
                          ? "bg-cyan-50 border-cyan-200 text-cyan-600"
                          : "bg-orange-50 border-orange-200 text-orange-600"
                    }
                    `}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">No skills</span>
              )}
            </div>

            {/* Bottom */}

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Hourly Rate</p>

                <h4 className="text-orange-500 font-bold text-lg">
                  ${user?.hourlyRate || 0}/hr
                </h4>
              </div>

              <div
                className="
                flex
                items-center
                gap-1
                bg-purple-50
                px-3
                py-2
                rounded-xl
                "
              >
                <Star size={15} className="text-purple-500 fill-purple-500" />

                <span className="text-sm font-medium text-purple-600">
                  {user?.skills?.length || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
