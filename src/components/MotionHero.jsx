"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function MotionHero({
  user,
  totalUsers,
  totalTasks,
  totalPayment,
}) {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const stats = [
    {
      value: `${totalTasks}+`,
      title: "Tasks Posted",
    },

    {
      value: `${totalUsers}+`,
      title: "Users",
    },

    {
      value: `$${totalPayment}`,
      title: "Total Payout",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#09090f] text-white">
      {/* Animated background */}

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
        className="
        absolute
        left-0
        top-0
        h-[500px]
        w-[500px]
        rounded-full
        bg-purple-600/20
        blur-[120px]
        "
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="
        absolute
        right-0
        bottom-0
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/20
        blur-[120px]
        "
      />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}

          <motion.div
            variants={fadeUp}
            className="
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-purple-500/30
            bg-white/5
            px-5
            py-2
            text-sm
            text-cyan-300
            backdrop-blur-md
            "
          >
            <Sparkles size={16} />
            Modern Freelance Micro-Task Platform
          </motion.div>

          {/* Title */}

          <motion.h1
            variants={fadeUp}
            className="
            text-5xl
            font-extrabold
            leading-tight
            md:text-7xl
            "
          >
            Complete tasks with
            <br />
            <span
              className="
              bg-gradient-to-r
              from-purple-400
              via-orange-400
              to-cyan-400
              bg-clip-text
              text-transparent
              "
            >
              talented freelancers
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="
            mx-auto
            mt-8
            max-w-2xl
            text-lg
            text-gray-300
            "
          >
            SkillSwap connects clients and freelancers through fast, secure and
            reliable micro-task collaboration.
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
            "
          >
            {user?.role === "freelancer" && (
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/post-task"
                  className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-purple-600
                  to-cyan-500
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-purple-500/30
                  "
                >
                  Post a Task
                  <ArrowRight
                    size={18}
                    className="
                    transition-transform
                    group-hover:translate-x-1
                    "
                  />
                </Link>
              </motion.div>
            )}

            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
            >
              <Link
                href="/browse-tasks"
                className="
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                via-purple-500
                to-cyan-500
                px-8
                py-4
                text-sm
                font-semibold
                shadow-lg
                shadow-cyan-500/20
                "
              >
                Browse Tasks
              </Link>
            </motion.div>
          </motion.div>

          {/* Dynamic Stats */}

          <motion.div
            variants={fadeUp}
            className="
            mx-auto
            mt-16
            grid
            max-w-lg
            grid-cols-3
            gap-6
            "
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-5
                backdrop-blur-md
                "
              >
                <h3
                  className="
                  bg-gradient-to-r
                  from-purple-400
                  to-cyan-400
                  bg-clip-text
                  text-3xl
                  font-bold
                  text-transparent
                  "
                >
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-gray-400">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
