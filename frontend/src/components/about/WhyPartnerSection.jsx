import { useData } from "../../context/DataContext";

const WhyPartnerSection = () => {
  const { globalData } = useData();
  const whyPartnerReasons = globalData?.aboutData?.whyPartner?.reasons || [];
  const whyPartnerTags = globalData?.aboutData?.whyPartner?.tags || [];

  return (
    <section className="relative py-20 md:py-24 bg-linear-to-b from-[hsl(var(--base))] to-[hsl(var(--mantle))] overflow-hidden">
      {/* Futuristic background: glow + grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[22px_22px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <header className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>Not just vendors — product partners</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight animate-in-view">
            Why Partner with Zsyio?
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed animate-in-view">
            We work as an embedded product team—aligning with your roadmap,
            shipping quickly, and staying accountable to real outcomes.
          </p>
        </header>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {whyPartnerReasons.map((reason) => (
            <article
              key={reason.id}
              className="
                group relative overflow-hidden
                rounded-2xl border border-[hsl(var(--surface2))]
                bg-[hsl(var(--base))]/80
                backdrop-blur-xl
                p-6 md:p-7
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:border-[hsl(var(--blue))]
                hover:shadow-[0_0_40px_rgba(56,189,248,0.28)]
                animate-in-view
              "
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--blue))]/0 via-[hsl(var(--blue))] to-[hsl(var(--blue))]/0 opacity-70" />
              <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[hsl(var(--blue))]/10 to-transparent pointer-events-none" />

              <div className="relative space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--text))]">
                  {reason.title}
                </h3>

                <div className="absolute inset-x-5 top-0 h-[2px] bg-linear-to-r from-transparent via-[hsl(var(--blue))] to-transparent opacity-50" />

                <p className="text-[hsl(var(--subtext1))] text-sm md:text-[0.95rem] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto mt-10 md:mt-12 animate-in-view">
          <div className="flex flex-wrap justify-center gap-2 text-[10px] md:text-xs text-[hsl(var(--subtext0))]">
            {whyPartnerTags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full border border-[hsl(var(--surface2))]
                  bg-[hsl(var(--base))]/70
                  px-3 py-1
                  backdrop-blur-md
                  hover:border-[hsl(var(--blue))]/60 hover:bg-[hsl(var(--blue))]/5
                  transition-colors duration-200
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerSection;
