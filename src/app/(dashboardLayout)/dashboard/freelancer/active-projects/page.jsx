import { getProposalsByEmail } from "@/lib/api/proposals";

const ActiveProjectFreelancer = async () => {
  const proposals = await getProposalsByEmail();
  return (
    <div>
      <h1>Active Projects</h1>
    </div>
  );
};

export default ActiveProjectFreelancer;
