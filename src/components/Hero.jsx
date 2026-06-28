import { getAllUsers } from "@/lib/api/users";
import { getAllPayments } from "@/lib/api/payment";
import { getAllTasks } from "@/lib/api/tasks";
import { getUserSession } from "@/lib/core/session";

import MotionHero from "./MotionHero";

export default async function Hero() {
  const session = await getUserSession();

  const userData = await getAllUsers();
  const paymentData = await getAllPayments();
  const taskData = await getAllTasks();

  // Dynamic totals
  const totalUsers = userData?.length || 0;

  const totalTasks = taskData?.length || 0;

  const totalPayment =
    paymentData?.reduce(
      (sum, payment) => sum + Number(payment.price || 0),
      0,
    ) || 0;

  return (
    <MotionHero
      user={session?.user}
      totalUsers={totalUsers}
      totalTasks={totalTasks}
      totalPayment={totalPayment}
    />
  );
}
