import React from "react";
const video = "https://res.cloudinary.com/damlvqiwv/video/upload/f_auto,q_auto/v1769755044/static_assets/cwd9mwam1ogxbiluxqwj.mp4";

const CultureVideoSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_65%)]
        "
      />

      {/* Subtle grid pattern */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-40
        "
      />

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <header className="text-center mb-12 md:mb-14 space-y-4">
          <div
            className="
              inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))]
              bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm
              text-[hsl(var(--subtext1))] animate-in-view
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>Inside the Zsyio mindset</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold animate-in-view">
            Experience Our Culture
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            A glimpse into how we think, collaborate, and ship — both inside the team and
            alongside our partners.
          </p>
        </header>

        {/* Video Card */}
        <div
          className="
            group relative rounded-2xl overflow-hidden
            border border-[hsl(var(--surface2))]
            bg-[hsl(var(--base))]/10 backdrop-blur-xl
            transition-all duration-300 animate-in-view
            hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]
            hover:-translate-y-1
          "
        >
          {/* On-hover glow */}
          <div
            className="
              pointer-events-none absolute inset-0 opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_70%)]
            "
          />

          <div className="aspect-video">
            <video
              src={video}
              controls
              loop
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureVideoSection;
