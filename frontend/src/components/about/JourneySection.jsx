import React from "react";

const JourneySection = () => {
  return (
    <section className="py-20 md:py-24 bg-[hsl(var(--mantle))]">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in-view">
          Our Journey
        </h2>
        <p className="text-center text-xs uppercase tracking-[0.25em] text-[hsl(var(--subtext0))] mb-8 animate-in-view">
          From idea to trusted partner
        </p>

        <p className="text-lg text-[hsl(var(--subtext1))] leading-relaxed text-center mb-10 animate-in-view">
          Founded by a team of passionate technologists, Zsyio began with a
          simple yet powerful idea: to bridge the gap between business
          challenges and technological solutions. From our humble beginnings, we
          have grown into a trusted partner for organizations worldwide, driven
          by our relentless pursuit of excellence and a deep understanding of
          the industries we serve. Our journey is a testament to the power of
          collaboration, innovation, and a client-first approach.
        </p>

        <div className="relative mt-10 max-w-3xl mx-auto animate-in-view">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[hsl(var(--surface2))]" />
          <div className="space-y-8 pl-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[hsl(var(--blue))] bg-[hsl(var(--surface0))] text-[10px]">
                  01
                </span>
                <p className="text-sm font-semibold">
                  Founding &amp; early projects
                </p>
              </div>
              <p className="text-xs text-[hsl(var(--subtext1))]">
                Building our first products with a small group of ambitious
                founders and teams.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[hsl(var(--blue))] bg-[hsl(var(--surface0))] text-[10px]">
                  02
                </span>
                <p className="text-sm font-semibold">Scaling capabilities</p>
              </div>
              <p className="text-xs text-[hsl(var(--subtext1))]">
                Expanding into mobile, cloud, and AI while formalizing our
                process and quality practices.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[hsl(var(--blue))] bg-[hsl(var(--surface0))] text-[10px]">
                  03
                </span>
                <p className="text-sm font-semibold">
                  Becoming a long-term partner
                </p>
              </div>
              <p className="text-xs text-[hsl(var(--subtext1))]">
                Working side-by-side with teams worldwide as a trusted,
                product-minded engineering partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

