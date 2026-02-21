import React from "react";
import {
  Globe2,
  HeartPulse,
  Banknote,
  ShoppingBag,
  Cpu,
  Building2,
  BookOpen,
} from "lucide-react";
import { useData } from "../../context/DataContext";

const getIndustryIcon = (id) => {
  switch (id) {
    case "healthcare":
      return HeartPulse;
    case "fintech":
      return Banknote;
    case "ecommerce":
      return ShoppingBag;
    case "saas":
      return Cpu;
    case "realestate":
      return Building2;
    case "education":
      return BookOpen;
    default:
      return Globe2;
  }
};

const getIndustryTagline = (id) => {
  switch (id) {
    case "healthcare":
      return "Patient-first digital experiences";
    case "fintech":
      return "Secure, compliant, real-time systems";
    case "ecommerce":
      return "Conversion-focused buying journeys";
    case "saas":
      return "Scalable modern product platforms";
    case "realestate":
      return "Operational clarity & visibility";
    case "education":
      return "Engaging learning ecosystems";
    case "ai":
      return "Intelligent automation & analysis";
    case "logistics":
      return "Efficiency powered by real-time data";
    default:
      return "Specialized digital solutions";
  }
};

const IndustriesSection = () => {
  const { globalData } = useData();
  const industries = globalData?.aboutData?.industries || [];
  return (
    <section className="relative py-20 md:py-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[22px_22px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <header className="text-center mb-12 md:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>Where Zsyio creates impact</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold animate-in-view">
            Industries We Serve
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-4xl mx-auto text-sm md:text-base leading-relaxed text-center animate-in-view">
            We adapt our engineering and product expertise to the unique demands
            of each sector — from compliance-heavy industries to fast-moving
            digital products.
          </p>
        </header>

        {/* Industries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = getIndustryIcon(industry.id);
            const tagline = getIndustryTagline(industry.id);
            const sectorNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={industry.id}
                className="
                  group relative h-full flex flex-col
                  rounded-2xl border border-[hsl(var(--surface2))]
                  bg-[hsl(var(--mantle))]/75 backdrop-blur-xl
                  p-4 md:p-5
                  transition-all duration-300
                  hover:-translate-y-2 hover:border-[hsl(var(--blue))]
                  hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
                  animate-in-view
                "
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%)] group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-r from-[hsl(var(--blue))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex flex-col gap-3 h-full">
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--blue))]/60 bg-[hsl(var(--blue))]/10">
                      <Icon className="h-4 w-4 text-[hsl(var(--blue))]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--subtext0))]">
                      Sector {sectorNumber}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-[hsl(var(--text))] text-sm md:text-base leading-snug">
                    {industry.name}
                  </h3>

                  {/* Divider */}
                  <div className="h-0.5 w-0 bg-linear-to-r from-[hsl(var(--blue))] to-transparent group-hover:w-1/2 transition-all duration-300" />

                  {/* Tagline */}
                  <p className="text-[hsl(var(--subtext1))] text-xs md:text-[0.8rem] leading-relaxed flex-1">
                    {tagline}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
