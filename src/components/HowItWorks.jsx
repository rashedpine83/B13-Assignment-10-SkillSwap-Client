import { ClipboardList, MessageSquareText, CreditCard } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Post a Task",
    description: "Describe what you need, set your budget and deadline.",
    icon: ClipboardList,
    color: "from-orange-500 to-orange-400 bg-orange-50 text-orange-500",
  },
  {
    id: "02",
    title: "Get Proposals",
    description: "Review proposals from freelancers and pick the best fit.",
    icon: MessageSquareText,
    color: "from-cyan-500 to-cyan-400 bg-cyan-50 text-cyan-500",
  },
  {
    id: "03",
    title: "Hire and Pay",
    description: "Approve the work, make secure payment, and leave a review.",
    icon: CreditCard,
    color: "from-purple-600 to-purple-500 bg-purple-50 text-purple-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-orange-100 text-orange-500">
            How it works
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-5">
            Three simple steps
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Start working with skilled freelancers in just a few simple steps.
          </p>
        </div>

        {/* Steps */}

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line */}

          <div className="hidden lg:block absolute top-16 left-[18%] w-[64%] border-t-2 border-dashed border-slate-200"></div>

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group bg-white rounded-3xl border border-slate-200 p-8 text-center hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 relative"
              >
                {/* Top Number */}

                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.color.split(" ")[0]} ${step.color.split(" ")[1]} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white text-2xl font-bold">
                    {step.id}
                  </span>
                </div>

                {/* Icon */}

                <div
                  className={`w-20 h-20 rounded-full ${step.color.split(" ")[2]} flex items-center justify-center mx-auto mt-6 group-hover:scale-110 transition`}
                >
                  <Icon size={34} className={step.color.split(" ")[3]} />
                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold text-slate-800 mt-7">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="text-slate-500 leading-7 mt-4">
                  {step.description}
                </p>

                {/* Bottom Gradient Border */}

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full rounded-b-3xl bg-gradient-to-r ${step.color.split(" ")[0]} ${step.color.split(" ")[1]}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
