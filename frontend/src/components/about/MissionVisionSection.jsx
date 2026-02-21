import React from "react";

const MissionVisionSection = ({ data }) => {
  const missionText = data?.mission || "To empower businesses worldwide through innovative technology solutions that simplify complexity and drive sustainable growth. We believe in building digital tools that don't just work, but inspire.";
  const visionText = data?.vision || "To be the most trusted global partner for digital innovation, recognized for our engineering excellence, client-first approach, and commitment to creating a future where technology serves humanity effortlessly.";
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-start">
          <div className="bg-[hsl(var(--mantle))] rounded-2xl p-8 md:p-10 border border-[hsl(var(--surface2))] animate-in-view">
            <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--blue))]">
              Our Mission
            </h3>
            <p className="text-[hsl(var(--subtext1))] leading-relaxed text-lg">
              {missionText}
            </p>
          </div>
          {/* Vision */}
          <div className="bg-[hsl(var(--mantle))] rounded-2xl p-8 md:p-10 border border-[hsl(var(--surface2))] animate-in-view">
            <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--peach))]">
              Our Vision
            </h3>
            <p className="text-[hsl(var(--subtext1))] leading-relaxed text-lg">
              {visionText}
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
