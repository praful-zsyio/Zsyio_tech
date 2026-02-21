import React from "react";

const MissionVisionSection = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-start">
          <div className="animate-in-view">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--subtext0))] mb-2">
              Why we exist
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(var(--blue))] mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-[hsl(var(--subtext1))] leading-relaxed">
              To empower businesses with cutting-edge technology, robust
              solutions, and strategic insights, enabling them to thrive in an
              ever-evolving digital landscape.
            </p>
          </div>

          <div className="animate-in-view">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--subtext0))] mb-2">
              Where we&apos;re going
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(var(--blue))] mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-[hsl(var(--subtext1))] leading-relaxed">
              To be a global leader in IT services and consulting, recognized
              for our commitment to innovation, quality, and unwavering client
              success.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 text-xs md:text-sm animate-in-view">
          <div className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--surface0))]/70 px-4 py-3">
            <p className="text-[hsl(var(--subtext0))] mb-1">
              We care about outcomes
            </p>
            <p className="text-[hsl(var(--text))]">
              We map each initiative back to clear product and business goals.
            </p>
          </div>
          <div className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--surface0))]/70 px-4 py-3">
            <p className="text-[hsl(var(--subtext0))] mb-1">
              We think long-term
            </p>
            <p className="text-[hsl(var(--text))]">
              Architecture, DX, and quality are treated as first-class citizens.
            </p>
          </div>
          <div className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--surface0))]/70 px-4 py-3">
            <p className="text-[hsl(var(--subtext0))] mb-1">
              We embed with your team
            </p>
            <p className="text-[hsl(var(--text))]">
              Designers and engineers work alongside your people, not in silos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
