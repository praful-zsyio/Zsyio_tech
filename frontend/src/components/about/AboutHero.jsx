import { useData } from "../../context/DataContext";

const AboutHero = () => {
  const { globalData, loading: isLoading } = useData();
  const topStats = globalData?.aboutData?.stats?.studio || [];
  const bottomStats = globalData?.aboutData?.stats?.meta || [];


  return (
    <header className="relative overflow-hidden bg-[hsl(var(--mantle))] pt-32 md:pt-40 pb-16 md:pb-20">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[hsl(var(--base))]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute -top-20 right-10 h-60 w-60 rounded-full bg-[hsl(var(--blue))]/16 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[hsl(var(--yellow))]/12 blur-3xl" />

      <div className="relative container mx-auto px-6 hero-content">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/80 px-3 py-1 text-xs text-[hsl(var(--subtext0))] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--green))]" />
          About Zsyio · Pioneering Digital Transformation
        </div>

        <div className="grid md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.3fr)] gap-6 md:gap-8 md:items-center">
          {/* LEFT: main story */}
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-[linear-gradient(120deg,hsl(var(--yellow)),hsl(var(--blue)))]">
              We turn complex ideas into reliable, scalable software.
            </h1>

            <p className="text-base md:text-lg text-[hsl(var(--subtext1))] mb-4">
              Pioneering Digital Transformation Through Innovative IT
              Solutions.
            </p>

            <p className="text-sm md:text-base text-[hsl(var(--subtext0))] mb-4">
              We partner with teams to design, build, and launch digital
              products across web, mobile, cloud, and AI—built for longevity,
              performance, and real-world outcomes.
            </p>

            <div className="mt-2 flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-[hsl(var(--subtext0))]">
              <span className="rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-3 py-1">
                Product-minded engineering
              </span>
              <span className="rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-3 py-1">
                Design · Build · Ship
              </span>
              <span className="rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-3 py-1">
                Web · Mobile · Cloud · AI
              </span>
            </div>
          </div>

          {/* RIGHT: floating stats card */}
          <div className="md:relative mt-6 md:mt-0">
            <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[95%] rounded-2xl bg-[hsl(var(--mantle))]/90 border border-[hsl(var(--surface2))] shadow-[0_24px_40px_rgba(0,0,0,0.55)] px-5 py-5 md:py-10 backdrop-blur-xl relative overflow-hidden">
              {/* subtle glows */}
              <div className="pointer-events-none absolute -top-10 right-0 h-28 w-28 rounded-full bg-[hsl(var(--blue))]/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-[hsl(var(--yellow))]/16 blur-2xl" />

              <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--subtext0))] mb-3 flex items-center justify-between">
                Studio Snapshot
                <span
                  className={`
                    inline-flex h-1.5 w-1.5 rounded-full
                    ${isLoading
                      ? "bg-[hsl(var(--blue))] animate-pulse"
                      : "bg-[hsl(var(--green))]"
                    }
                  `}
                />
              </p>

              {/* top stats */}
              <div className="flex justify-between gap-2 mb-4">
                {topStats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <p
                      className={`text-2xl md:text-3xl font-semibold ${isLoading ? "opacity-60 animate-pulse" : ""
                        }`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] md:text-xs text-[hsl(var(--subtext0))]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* bottom meta stats */}
              <div className="grid grid-cols-2 gap-3 text-[11px] md:text-xs text-[hsl(var(--subtext0))]">
                {bottomStats.map((meta) =>
                  isLoading ? (
                    <div
                      key={meta.id}
                      className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 px-3 py-2 animate-pulse"
                    >
                      <div className="h-3 w-20 rounded-full bg-[hsl(var(--surface2))] mb-2" />
                      <div className="h-4 w-24 rounded-full bg-[hsl(var(--surface2))]" />
                    </div>
                  ) : (
                    <div
                      key={meta.id}
                      className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 px-3 py-2"
                    >
                      <p className="text-[11px] text-[hsl(var(--subtext1))]">
                        {meta.label}
                      </p>
                      <p className="text-sm font-semibold text-[hsl(var(--text))]">
                        {meta.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
