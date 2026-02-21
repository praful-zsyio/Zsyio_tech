import React from "react";

const CtaSection = () => {
  return (
    <section className="relative py-20 md:py-28 text-center overflow-hidden">
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.20),_transparent_70%)]
        "
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
      />

      {/* Light gradient overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-b from-transparent via-[hsl(var(--mantle))]/30 to-transparent
        "
      />

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Label */}
        <div
          className="
            inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))]
            bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm
            text-[hsl(var(--subtext1))] mb-5 animate-in-view
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
          <span>Ready to collaborate?</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 animate-in-view">
          Let&apos;s Build Something Great Together
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-[hsl(var(--subtext1))] max-w-3xl mx-auto mb-10 animate-in-view leading-relaxed">
          Have a project in mind, exploring an idea, or want to understand how
          we work? Our team would love to hear from you.
        </p>

        {/* CTA Button */}
        <a
          href="/contact"
          className="
            relative inline-flex items-center justify-center
            bg-[hsl(var(--blue))] text-[hsl(var(--crust))]
            font-semibold text-lg px-10 py-3.5 rounded-xl
            transition-all duration-300
            hover:bg-[hsl(var(--sapphire))]
            hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
            animate-in-view
          "
        >
          Get in Touch
        </a>

        {/* Subtle below-text */}
        <p className="text-[hsl(var(--subtext0))] text-xs md:text-sm mt-4 animate-in-view">
          Expect a response within 24 hours.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
