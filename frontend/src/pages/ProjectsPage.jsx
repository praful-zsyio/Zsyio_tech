import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const container = useRef(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjectsData(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error))
      .finally(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      if (!container.current || loading) return;

      // HERO ANIMATION
      const heroEls = container.current.querySelectorAll(
        ".projects-hero-animate"
      );

      if (heroEls.length) {
        gsap.from(heroEls, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // ROWS ANIMATION — animate each row individually with its own ScrollTrigger
      const rowNodes = container.current.querySelectorAll(".project-row-animate");
      const rows = gsap.utils.toArray(rowNodes);

      rows.forEach((row, index) => {
        gsap.from(row, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: index * 0.05, // light staggering by index (optional)
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: container, dependencies: [loading] }
  );

  const totalProjects = projectsData?.length || 0;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))]">Loading...</div>;
  }

  return (
    <div
      ref={container}
      className="min-h-screen bg-[hsl(var(--base))] text-[hsl(var(--text))]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.10), transparent 45%), radial-gradient(circle at 80% 80%, rgba(245,158,11,0.12), transparent 45%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          {/* LEFT: Sticky intro / metrics */}
          <aside className="lg:sticky lg:top-24 self-start space-y-6">
            <span className="projects-hero-animate inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/70 px-3 py-1 text-xs text-[hsl(var(--subtext1))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--green))]" />
              <span>Case studies · Selected work</span>
            </span>

            <h1 className="projects-hero-animate text-3xl md:text-5xl font-semibold tracking-tight">
              Products that move{" "}
              <span className="block bg-clip-text text-transparent bg-[linear-gradient(120deg,hsl(var(--blue)),hsl(var(--green)))]">
                metrics, not just pixels.
              </span>
            </h1>

            <p className="projects-hero-animate text-sm md:text-base text-[hsl(var(--subtext1))] leading-relaxed max-w-xl">
              From 0→1 launches to large-scale replatforming, we help teams ship
              web, mobile, and platform work that survives real traffic, edge
              cases, and changing roadmaps.
            </p>

            <dl
              className="
                projects-hero-animate
                grid grid-cols-2 gap-4 text-xs md:text-sm
                border border-[hsl(var(--surface1))]
                rounded-2xl p-4
                bg-[hsl(var(--mantle))]/70
              "
            >
              <div>
                <dt className="text-[hsl(var(--subtext0))]">Projects shipped</dt>
                <dd className="text-lg font-semibold text-[hsl(var(--text))]">
                  {totalProjects}
                </dd>
              </div>
              <div>
                <dt className="text-[hsl(var(--subtext0))]">
                  Typical launch window
                </dt>
                <dd className="text-lg font-semibold text-[hsl(var(--text))]">
                  10–12 weeks
                </dd>
              </div>
            </dl>

            <p className="projects-hero-animate text-[11px] md:text-xs text-[hsl(var(--subtext0))] max-w-xs">
              Each engagement is different, but the bar stays the same:
              measurable impact, clean architecture, and a team you can actually
              talk to.
            </p>
          </aside>

          {/* RIGHT: Case study rows */}
          <main className="space-y-6">
            {projectsData.map((project) => (
              <article
                key={project.id}
                className="
                  project-row-animate
                  group relative overflow-hidden
                  rounded-2xl
                  border border-[hsl(var(--surface1))]
                  bg-[hsl(var(--mantle))]/80
                  backdrop-blur-xl
                  p-5 md:p-6
                  flex flex-col gap-4
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-[hsl(var(--blue))]
                  hover:shadow-[0_0_32px_rgba(56,189,248,0.28)]
                "
              >
                {/* subtle top accent line */}
                <div
                  className="absolute inset-x-5 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--blue))] to-transparent opacity-80"
                  aria-hidden="true"
                />

                {/* subtle right glow */}
                <div
                  className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(var(--blue))]/10 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <header className="flex items-start justify-between gap-4 relative z-10">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-[hsl(var(--text))]">
                      {project.title || "Project title"}
                    </h2>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[hsl(var(--subtext0))] mt-1">
                      {project.category ||
                        project.type ||
                        "Digital product · Web / Mobile"}
                    </p>
                  </div>

                  {project.highlight && (
                    <span className="inline-flex items-center rounded-full bg-[hsl(var(--green))]/10 text-[hsl(var(--green))] px-2.5 py-0.5 text-[11px] border border-[hsl(var(--green))]/40">
                      {project.highlight}
                    </span>
                  )}
                </header>

                <p className="text-sm md:text-[15px] text-[hsl(var(--subtext1))] leading-relaxed relative z-10">
                  {project.description ||
                    project.summary ||
                    "A brief description of the project, the problem space, and how the solution moved key metrics or unlocked new capabilities."}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                  {/* Tech / tags */}
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-[hsl(var(--subtext0))]">
                    {(project.techStack ||
                      project.tags ||
                      project.stack ||
                      []
                    )
                      .slice(0, 4)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="
                            px-2.5 py-1 rounded-full
                            bg-[hsl(var(--surface0))]
                            text-[hsl(var(--subtext1))]
                          "
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Link to details */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="
                      text-[11px] md:text-xs font-medium
                      text-[hsl(var(--blue))]
                      hover:text-[hsl(var(--sapphire))]
                      inline-flex items-center gap-1
                    "
                  >
                    View details
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}

            {projectsData.length === 0 && (
              <p className="text-sm text-[hsl(var(--subtext1))]">
                No projects available yet. Add some entries to{" "}
                <code>projectsData</code>.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
