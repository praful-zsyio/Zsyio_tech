import React from "react";
import { Search, PencilRuler, Code, Rocket } from "lucide-react";
import { useData } from "../../context/DataContext";

const iconMap = { Search, PencilRuler, Code, Rocket };

const ProcessSection = () => {
  const { globalData } = useData();
  const processSteps = globalData?.aboutData?.process || [];
  return (
    <section
      className="
        relative py-20 md:py-24
        bg-gradient-to-b from-[hsl(var(--base))] via-[hsl(var(--mantle))] to-[hsl(var(--base))]
      "
    >
      {/* Futuristic background grid + glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_60%)]
        "
        aria-hidden="true"
      />
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-40
        "
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <header className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>How we move from idea to launch</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight animate-in-view">
            Our Collaborative Process
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            A simple sequence that keeps your team involved and every decision
            traceable—from discovery to launch.
          </p>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop horizontal line */}
          <div
            className="
              hidden md:block absolute top-10 left-0 h-[2px] w-full
              bg-gradient-to-r from-[hsl(var(--blue))]/0 via-[hsl(var(--surface2))] to-[hsl(var(--blue))]/0
              opacity-80
              animate-in-view
            "
            aria-hidden="true"
          />

          <div
            className="
              grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10
              items-stretch
            "
          >
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon];

              return (
                <article
                  key={step.id}
                  className="
                    group relative flex md:block items-start md:items-center gap-4
                    animate-in-view
                    h-full
                  "
                >
                  {/* Mobile vertical connector */}
                  {index !== processSteps.length - 1 && (
                    <div
                      className="
                        absolute left-[1.5rem] top-12 bottom-[-1.5rem]
                        md:hidden
                        border-l border-dashed border-[hsl(var(--surface2))]
                      "
                      aria-hidden="true"
                    />
                  )}

                  {/* Step icon + label */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className="
                        flex items-center justify-center
                        w-10 h-10 md:w-11 md:h-11
                        rounded-full border border-[hsl(var(--blue))]/60
                        bg-[hsl(var(--mantle))]/90
                        shadow-[0_0_16px_rgba(56,189,248,0.28)]
                        group-hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]
                        transition-all duration-300
                      "
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 md:w-5 md:h-5 text-[hsl(var(--blue))]" />
                      )}
                    </div>
                    <span className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--subtext0))]">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Compact card */}
                  <div
                    className="
                      mt-2 md:mt-5 flex-1
                      rounded-xl border border-[hsl(var(--surface2))]
                      bg-[hsl(var(--base))]/80
                      backdrop-blur-xl
                      p-3.5 md:p-4
                      transition-all duration-300 ease-out
                      group-hover:-translate-y-1.5 group-hover:border-[hsl(var(--blue))]
                      group-hover:shadow-[0_0_24px_rgba(56,189,248,0.22)]
                      flex flex-col h-full
                    "
                  >
                    {/* Subtle hover glow */}
                    <div
                      className="
                        pointer-events-none absolute inset-0 opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-300
                        bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_65%)]
                      "
                      aria-hidden="true"
                    />

                    <div className="relative flex flex-col h-full space-y-2">
                      <h3 className="font-semibold text-sm md:text-base text-[hsl(var(--text))]">
                        {step.title}
                      </h3>

                      <div className="h-px w-8 bg-gradient-to-r from-transparent via-[hsl(var(--blue))] to-transparent opacity-60" />

                      <p className="text-[hsl(var(--subtext1))] text-xs md:text-sm leading-relaxed flex-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
