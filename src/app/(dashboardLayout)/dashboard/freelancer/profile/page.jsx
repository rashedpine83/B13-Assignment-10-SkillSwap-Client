import { getUserByEmail } from "@/lib/api/users";
import EditProfileForm from "./EditProfileForm";

import { getUserSession } from "@/lib/core/session";

export default async function ProfilePage() {
  const userSession = await getUserSession();

  const user = await getUserByEmail(userSession?.email);
  console.log("user:", user);

  return <EditProfileForm defaultData={user} />;
}
