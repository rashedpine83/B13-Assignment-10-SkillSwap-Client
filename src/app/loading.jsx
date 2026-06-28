"use client";

import { Grid } from "react-loader-spinner";

export default function Loading() {
  return (
    <div
      className="
      fixed
      inset-0
      flex
      flex-col
      items-center
      justify-center
      bg-white
      z-50
      "
    >
      {/* Spinner */}

      <Grid
        height={65}
        width={65}
        color="#9333ea"
        secondaryColor="#06b6d4"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />

      {/* Text */}

      <h2
        className="
        mt-6
        text-lg
        font-semibold
        bg-gradient-to-r
        from-purple-600
        via-cyan-500
        to-orange-500
        bg-clip-text
        text-transparent
        "
      >
        Loading SkillSwap...
      </h2>

      <p className="text-sm text-gray-400 mt-2">Please wait a moment</p>
    </div>
  );
}
