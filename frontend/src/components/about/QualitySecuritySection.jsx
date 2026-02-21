import React from "react";
import { ShieldCheck, BadgeCheck } from "lucide-react";

const QualitySecurityCard = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <article
      className="
        group relative h-full
        rounded-2xl border border-[hsl(var(--surface2))]
        bg-[hsl(var(--mantle))]/75
        backdrop-blur-xl
        p-6 md:p-7
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:border-[hsl(var(--blue))]
        hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]
        animate-in-view
      "
    >
      {/* Hover glow */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_65%)]
        "
        aria-hidden="true"
      />

      <div className="relative flex flex-col h-full">
        {/* Icon + label */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="
              inline-flex h-10 w-10 items-center justify-center
              rounded-full border border-[hsl(var(--blue))]/60
              bg-[hsl(var(--blue))]/10
            "
          >
            <Icon className="h-5 w-5 text-[hsl(var(--blue))]" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--text))]">
            {title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-[hsl(var(--subtext1))] leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

const QualitySecuritySection = () => {
  return (
    <section
      className="
        relative py-20 md:py-24
        bg-gradient-to-b from-[hsl(var(--base))] via-[hsl(var(--mantle))] to-[hsl(var(--base))]
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]
        "
        aria-hidden="true"
      />

      {/* Subtle grid */}
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
        {/* Heading */}
        <header className="text-center mb-12 md:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>Built to last. Secured by design.</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center animate-in-view">
            Our Commitment to Quality &amp; Security
          </h2>

          <p className="text-center text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            We design for longevity and resilience—from code quality and testing
            practices to security hardening and observability.
          </p>
        </header>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch text-left">
          <QualitySecurityCard
            icon={BadgeCheck}
            title="Uncompromising Quality"
            description="We adhere to rigorous testing and quality assurance protocols throughout the development lifecycle. Our goal is to deliver software that is not only functional but also reliable, scalable, and maintainable."
          />
          <QualitySecurityCard
            icon={ShieldCheck}
            title="Fortified Security"
            description="In today's digital world, security is paramount. We integrate best-in-class security practices, from data encryption to threat modeling, ensuring your application and data are protected against emerging threats."
          />
        </div>
      </div>
    </section>
  );
};

export default QualitySecuritySection;
