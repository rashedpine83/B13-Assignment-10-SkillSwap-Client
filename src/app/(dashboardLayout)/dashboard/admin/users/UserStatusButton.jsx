"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Ban, ShieldCheck } from "lucide-react";

import { updateUser } from "@/lib/actions/users";

const UserStatusButton = ({ email, status }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleStatus = () => {
    const newStatus = status === "Blocked" ? "Active" : "Blocked";

    startTransition(async () => {
      await updateUser(email, {
        status: newStatus,
      });

      router.refresh();
    });
  };

  return status === "Blocked" ? (
    <button
      disabled={isPending}
      onClick={handleStatus}
      className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      bg-cyan-100
      text-cyan-700
      hover:bg-cyan-200
      transition
      disabled:opacity-50
      "
    >
      <ShieldCheck size={16} />

      {isPending ? "Loading..." : "Unblock"}
    </button>
  ) : (
    <button
      disabled={isPending}
      onClick={handleStatus}
      className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      bg-orange-100
      text-orange-700
      hover:bg-orange-200
      transition
      disabled:opacity-50
      "
    >
      <Ban size={16} />

      {isPending ? "Loading..." : "Block"}
    </button>
  );
};

export default UserStatusButton;
