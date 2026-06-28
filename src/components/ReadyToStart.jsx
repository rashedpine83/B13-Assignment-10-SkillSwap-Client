import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ReadyToStart = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden border border-slate-200 bg-white shadow-2xl px-8 py-20 md:px-20">
          {/* Background Blur Effects */}

          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-[100px]" />

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-[100px]" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/40 rounded-full blur-[120px]" />

          {/* Decorative Circle */}

          <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full border-[20px] border-orange-200/30"></div>

          <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full border-[20px] border-cyan-200/30"></div>

          {/* Small Gradient Dots */}

          <div className="absolute top-12 right-20 w-32 h-32 opacity-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl"></div>

          <div className="absolute bottom-12 left-20 w-32 h-32 opacity-20 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full blur-3xl"></div>

          {/* Content */}

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
              Ready to{" "}
              <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                get started?
              </span>
            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-500 leading-8">
              Join TaskHive today and start posting tasks or finding work. Free
              to sign up.
            </p>

            {/* Button */}

            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-white font-semibold bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Create Your Account
                <span className="bg-white/20 p-2 rounded-full">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
