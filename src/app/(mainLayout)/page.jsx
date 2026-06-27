import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ReadyToStart from "@/components/ReadyToStart";
import TopFreelancer from "@/components/TopFreelancer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TopFreelancer />
      <HowItWorks />
      <ReadyToStart />
    </div>
  );
}
