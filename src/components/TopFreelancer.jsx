import { getAllUsers } from "@/lib/api/users";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const TopFreelancer = async () => {
  const users = await getAllUsers();

  // Only freelancers
  const freelancers =
    users?.filter((user) => user?.role === "freelancer") || [];

  // Sort by skills array length (highest first)
  const topFreelancers = freelancers
    .sort((a, b) => (b?.skills?.length || 0) - (a?.skills?.length || 0))
    .slice(0, 4);

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            Freelancers
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-800">
            Top Freelancers
          </h2>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Discover highly skilled freelancers with experience across multiple
            technologies.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {topFreelancers?.map((user) => (
            <Link
              href={`/browse-freelancers/${user._id}`}
              key={user?._id}
              className="group bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
            >
              {/* Top Gradient Line */}

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-orange-500"></div>

              {/* Avatar */}

              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 via-cyan-100 to-orange-100 flex items-center justify-center text-2xl font-bold text-cyan-600 group-hover:scale-110 transition">
                  {user?.name?.charAt(0)}
                </div>
              </div>

              {/* Name */}

              <div className="text-center mt-5">
                <h3 className="font-bold text-lg text-slate-800">
                  {user?.name}
                </h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {user?.bio || "No bio available"}
                </p>
              </div>

              {/* Skills */}

              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {user?.skills?.slice(0, 3)?.map((skill, index) => (
                  <span
                    key={index}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      index === 0
                        ? "bg-purple-50 border-purple-200 text-purple-600"
                        : index === 1
                          ? "bg-cyan-50 border-cyan-200 text-cyan-600"
                          : "bg-orange-50 border-orange-200 text-orange-600"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom */}

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Hourly Rate</p>

                  <h4 className="text-orange-500 font-bold text-lg">
                    ${user?.hourlyRate}/hr
                  </h4>
                </div>

                <div className="flex items-center gap-1 bg-purple-50 px-3 py-2 rounded-xl">
                  <Star size={15} className="text-purple-500 fill-purple-500" />

                  <span className="text-sm font-medium text-purple-600">
                    {user?.skills?.length || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}

        <div className="text-center mt-14">
          <Link
            href="/browser-freelancers"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-purple-600 transition"
          >
            View all freelancers
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopFreelancer;
