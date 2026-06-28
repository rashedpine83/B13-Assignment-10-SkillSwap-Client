"use client";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl">
            <BiSearchAlt className="text-5xl text-indigo-400" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
          The page you are looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-semibold shadow-lg shadow-indigo-500/30"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white font-semibold backdrop-blur-lg"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-sm text-slate-500">
          Lost in space? Let’s get you back on track 🚀
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
