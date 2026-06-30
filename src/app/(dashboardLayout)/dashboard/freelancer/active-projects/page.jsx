import { getProposalEmail } from "@/lib/api/proposals";
import { getUserSession } from "@/lib/core/session";
import ProjectCards from "./ProjectCard";

const ActiveProjectFreelancer = async () => {
  const user = await getUserSession();

  if (!user?.email) {
    return <div className="p-8">User not found</div>;
  }

  const proposals = await getProposalEmail(user.email);

  return (
    <div className="p-8">
      <ProjectCards proposals={proposals || []} />
    </div>
  );
};

export default ActiveProjectFreelancer;
