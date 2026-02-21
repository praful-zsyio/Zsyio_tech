import React from "react";
import { useData } from "../../context/DataContext";

const TestimonialCard = ({ quote, name, role }) => {
  return (
    <figure
      className="
        group relative h-full flex flex-col
        rounded-xl border border-[hsl(var(--surface2))]
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
      <div className="absolute inset-0 bg-linear-to-r from-[hsl(var(--blue))]/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_65%)]
        "
        aria-hidden="true"
      />

      {/* Quote mark accent */}
      <div className="relative mb-4 flex items-center gap-2 text-[hsl(var(--blue))] text-xs uppercase tracking-[0.18em]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
        <span>Client feedback</span>
      </div>

      {/* Quote */}
      <blockquote className="relative text-[hsl(var(--subtext1))] text-sm md:text-[0.95rem] leading-relaxed mb-6">
        <span className="mr-1 text-lg align-top text-[hsl(var(--blue))]">“</span>
        {quote}
        <span className="ml-1 text-lg align-baseline text-[hsl(var(--blue))]">”</span>
      </blockquote>

      {/* Divider */}
      <div className="relative mb-4 h-px w-10 bg-gradient-to-r from-transparent via-[hsl(var(--blue))] to-transparent opacity-70" />

      {/* Name / Role */}
      <figcaption className="relative mt-auto">
        <p className="font-semibold text-[hsl(var(--text))] text-base md:text-lg">
          {name}
        </p>
        <p className="text-[hsl(var(--blue))] text-xs md:text-sm font-medium">
          {role}
        </p>
      </figcaption>
    </figure>
  );
};

const TestimonialsSection = () => {
  const { globalData } = useData();
  const testimonials = globalData?.aboutData?.testimonials || [];
  return (
    <section
      className="
        relative py-20 md:py-24
      "
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[22px_22px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading block */}
        <header className="text-center mb-12 md:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>Proof, not promises</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight animate-in-view">
            What Our Clients Say
          </h2>

          <p className="text-center text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            Long-term, outcome-driven partnerships are at the heart of how we
            work.<br />Here&apos;s what a few teams had to say.
          </p>
        </header>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              name={item.name}
              role={item.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
