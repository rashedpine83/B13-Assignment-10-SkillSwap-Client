"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiClock,
  FiCheckCircle,
  FiCalendar,
  FiSend,
  FiX,
} from "react-icons/fi";

export default function ProjectCards({ proposals }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(proposals);
    }
  }, [proposals]);

  const [showModal, setShowModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [url, setUrl] = useState("");

  const inProgress = projects.filter((item) => item.status === "In Progress");

  const completed = projects.filter((item) => item.status === "completed");

  const handleModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const updatedProjects = projects.map((project) => {
        if (project._id === selectedProject._id) {
          return {
            ...project,
            status: "completed",
            deliverableUrl: url,
          };
        }

        return project;
      });

      setProjects(updatedProjects);

      // save completed state
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      setShowModal(false);

      setSelectedProject(null);

      setUrl("");

      toast.success("Project marked as completed 🎉");
    } catch (error) {
      toast.error("Something went wrong");

      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Active Projects</h1>

      <p className="text-gray-500 mt-1">
        {inProgress.length} in progress · {completed.length} completed
      </p>

      {/* In Progress */}

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <FiClock className="text-cyan-500 text-xl" />

          <h2 className="text-xl font-bold">In Progress</h2>

          <span
            className="
            bg-cyan-100
            text-cyan-700
            rounded-full
            px-3
            py-1
            text-sm
            "
          >
            {inProgress.length}
          </span>
        </div>

        <div className="space-y-6 mt-6">
          {inProgress.map((project) => (
            <div
              key={project._id}
              className="
              bg-white
              rounded-3xl
              border
              p-6
              shadow-sm
              hover:shadow-lg
              transition
              "
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">{project.taskTitle}</h2>

                  <p className="text-gray-500 mt-1">{project.coverNote}</p>
                </div>

                <span
                  className="
                  bg-orange-100
                  text-orange-600
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  In Progress
                </span>
              </div>

              <div className="flex gap-6 mt-5">
                <span
                  className="
                  bg-purple-100
                  text-purple-700
                  px-3
                  py-1
                  rounded-full
                  "
                >
                  Writing
                </span>

                <span
                  className="
                  text-cyan-600
                  font-bold
                  "
                >
                  ${project.proposedBudget}
                </span>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  "
                >
                  <FiCalendar />

                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              <hr className="my-5" />

              <div
                className="
                flex
                justify-between
                items-center
                "
              >
                <p className="text-gray-500 text-sm">
                  Client: {project.clientEmailId}
                </p>

                <button
                  onClick={() => handleModal(project)}
                  className="
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  px-5
                  py-2
                  rounded-xl
                  text-white
                  flex
                  items-center
                  gap-2
                  "
                >
                  <FiSend />
                  Submit Deliverable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}

      <div className="mt-12">
        <div className="flex items-center gap-3">
          <FiCheckCircle
            className="
            text-green-500
            text-xl
            "
          />

          <h2 className="text-xl font-bold">Completed</h2>

          <span
            className="
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            "
          >
            {completed.length}
          </span>
        </div>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          mt-6
          "
        >
          {completed.map((project) => (
            <div
              key={project._id}
              className="
              bg-white
              rounded-3xl
              border
              p-6
              shadow-sm
              "
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold">{project.taskTitle}</h2>

                  <p className="text-gray-500">{project.coverNote}</p>
                </div>

                <span
                  className="
                  bg-cyan-100
                  text-cyan-700
                  px-4
                  py-1
                  rounded-full
                  "
                >
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          flex
          justify-center
          items-center
          z-50
          "
        >
          <div
            className="
            bg-white
            rounded-3xl
            p-7
            w-[500px]
            "
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-xl">Submit Deliverable</h2>

              <button onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>

            <p className="text-gray-500 mt-2">
              Provide a link to your completed work
            </p>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/document"
              className="
              w-full
              border-2
              border-orange-300
              rounded-xl
              p-4
              mt-5
              "
            />

            <div
              className="
              bg-orange-50
              border
              border-orange-200
              rounded-xl
              p-4
              mt-5
              text-orange-600
              "
            >
              Note: Once marked completed, status cannot be reverted.
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="
                flex-1
                py-3
                border
                rounded-xl
                "
              >
                Cancel
              </button>

              <button
                disabled={!url.trim()}
                onClick={handleSubmit}
                className="
                flex-1
                py-3
                rounded-xl
                text-white
                disabled:bg-gray-300
                bg-gradient-to-r
                from-purple-600
                to-cyan-500
                "
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
