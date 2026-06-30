import { getCompletedTasksByFreelancerEmail } from "@/lib/api/completeTask";
import { getReviewsByFreelancerEmail } from "@/lib/api/review";
import { getUserById } from "@/lib/api/users";

import { FiBriefcase, FiDollarSign, FiCalendar } from "react-icons/fi";

import { Star } from "lucide-react";

const FreelancerDetailsPage = async ({ params }) => {
  const { id } = await params;

  const freelancer = await getUserById(id);

  // IMPORTANT:
  // use freelancer email
  // not logged user email

  const reviews = await getReviewsByFreelancerEmail(freelancer?.email);

  const completedTasks = await getCompletedTasksByFreelancerEmail(
    freelancer?.email,
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Header */}

      <div
        className="
        bg-white
        border
        rounded-3xl
        p-8
        shadow-sm
        "
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar */}

          <div
            className="
            w-28
            h-28
            rounded-full
            bg-gradient-to-br
            from-purple-100
            via-cyan-100
            to-orange-100
            flex
            items-center
            justify-center
            text-4xl
            font-bold
            text-cyan-700
            "
          >
            {freelancer?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800">
              {freelancer?.name}
            </h1>

            <div className="flex flex-wrap gap-6 mt-4">
              {/* completed */}

              <div className="flex items-center gap-2 text-slate-500">
                <FiBriefcase className="text-purple-500" />

                <span>{completedTasks?.length || 0} jobs completed</span>
              </div>

              {/* rate */}

              <div className="flex items-center gap-2 text-slate-500">
                <FiDollarSign className="text-orange-500" />

                <span>
                  ${freelancer?.hourlyRate || 0}
                  /hr
                </span>
              </div>

              {/* joined */}

              <div className="flex items-center gap-2 text-slate-500">
                <FiCalendar className="text-cyan-500" />

                <span>
                  Joined {new Date(freelancer?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* About */}

        <div
          className="
          lg:col-span-2
          bg-white
          border
          rounded-3xl
          p-6
          shadow-sm
          "
        >
          <h2 className="font-bold text-xl text-purple-700">About</h2>

          <p className="text-slate-500 mt-5">
            {freelancer?.bio || "No bio available"}
          </p>
        </div>

        {/* Skills */}

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-6
          shadow-sm
          "
        >
          <h2 className="font-bold text-xl text-cyan-700">Skills</h2>

          <div className="flex flex-wrap gap-2 mt-5">
            {freelancer?.skills?.length > 0 ? (
              freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm

                    ${
                      index % 3 === 0
                        ? "bg-purple-100 text-purple-700"
                        : index % 3 === 1
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-orange-100 text-orange-700"
                    }
                    `}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-400">No skills</span>
            )}
          </div>
        </div>

        {/* Reviews */}

        <div
          className="
          lg:col-span-2
          bg-white
          border
          rounded-3xl
          p-6
          shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="
              text-orange-500
              fill-orange-500
              "
            />

            <h2 className="font-bold text-xl">
              Reviews ({reviews?.length || 0})
            </h2>
          </div>

          {reviews?.length > 0 ? (
            <div className="space-y-5 mt-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="
                    rounded-2xl
                    p-5
                    bg-slate-50
                    border
                    "
                >
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="
                            text-orange-500
                            fill-orange-500
                            "
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-slate-600">"{review.comment}"</p>

                  <p className="mt-3 text-sm text-cyan-600">{review.user}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 text-slate-400">No reviews yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetailsPage;
