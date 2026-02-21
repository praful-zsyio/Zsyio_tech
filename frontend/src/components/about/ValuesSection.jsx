import React from "react";
import { Lightbulb, ShieldCheck, Gem, Handshake } from "lucide-react";
import { useData } from "../../context/DataContext";

const iconMap = {
  Lightbulb,
  ShieldCheck,
  Gem,
  Handshake,
};

const ValueCard = ({ icon, title, description }) => {
  const Icon = iconMap[icon];

  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl border border-[hsl(var(--surface2))]
        bg-[hsl(var(--mantle))]/80
        backdrop-blur-xl
        p-6 md:p-7
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:border-[hsl(var(--blue))]
        hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]
        animate-in-view
      "
    >
      {/* Subtle gradient glow in background */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]
        "
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--blue))]/0 via-[hsl(var(--blue))] to-[hsl(var(--blue))]/0 opacity-60" />

      {/* Icon */}
      {Icon && (
        <div className="relative mb-5 flex justify-center">
          <div
            className="
              inline-flex h-12 w-12 items-center justify-center
              rounded-full border border-[hsl(var(--blue))]/50
              bg-[hsl(var(--blue))]/10
              shadow-[0_0_25px_rgba(56,189,248,0.35)]
              group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]
              transition-shadow duration-300
            "
            aria-hidden="true"
          >
            <Icon className="h-6 w-6 text-[hsl(var(--blue))]" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        className="
          text-lg md:text-xl font-semibold mb-2
          text-[hsl(var(--text))]
        "
      >
        {title}
      </h3>

      {/* Divider */}
      <div className="mx-auto mb-3 h-px w-8 bg-gradient-to-r from-transparent via-[hsl(var(--blue))] to-transparent opacity-70" />

      {/* Description */}
      <p className="text-[hsl(var(--subtext1))] text-sm md:text-[0.95rem] leading-relaxed">
        {description}
      </p>
    </article>
  );
};

const ValuesSection = () => {
  const { globalData } = useData();
  const coreValues = globalData?.aboutData?.values || [];
  return (
    <section
      className="
        relative py-20 md:py-24
        bg-gradient-to-b from-[hsl(var(--base))] via-[hsl(var(--mantle))] to-[hsl(var(--base))]
      "
    >
      {/* Futuristic background grid / glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]
        "
        aria-hidden="true"
      />
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-40
        "
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading block */}
        <header className="text-center mb-12 md:mb-16 space-y-4">


          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight animate-in-view">
            Our Core Values
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            These are the principles that shape how we think, build, and
            collaborate—internally and with every client team we work with.
          </p>
        </header>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {coreValues?.map((value) => (
            <ValueCard
              key={value.id}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
