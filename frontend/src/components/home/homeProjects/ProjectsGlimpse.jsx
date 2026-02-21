import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../../../services/api";
import ProjectCard from "./ProjectCard"; // you can still reuse this if you like

gsap.registerPlugin(ScrollTrigger);

const ProjectsGlimpse = () => {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".pg-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }).from(
        ".pg-hero-card",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      ).from(
        ".pg-side-card",
        {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.5"
      );
    },
    { scope: container, dependencies: [loading] }
  );

  // Make sure we have at least 1 project
  if (loading) return null; // Or a spinner
  if (!projectsData || projectsData.length === 0) return null;

  const featured = projectsData[0];
  const sideProjects = projectsData.slice(1, 3); // next 2 as side cards

  return (
    <section
      ref={container}
      className="
        py-20 md:py-28 
        relative overflow-hidden 
        bg-[hsl(var(--base))]
        text-[hsl(var(--text))]
      "
    >
      {/* Neon-ish glow background */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          opacity-70
          bg-[radial-gradient(circle_at_10%_0%,hsl(var(--blue)/0.35),transparent_55%),radial-gradient(circle_at_90%_100%,hsl(var(--peach)/0.22),transparent_55%)]
        "
      />
      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[hsl(var(--mantle))]/40" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="pg-header">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[hsl(var(--subtext0))]">
              Selected Work
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              Projects that ship
              <span className="block text-[hsl(var(--subtext1))] text-base md:text-lg font-normal">
                and actually move the metrics.
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[hsl(var(--subtext1))] max-w-xl">
              A quick snapshot of the products, platforms, and experiences
              we&apos;ve helped teams bring to life — from first commit to launch.
            </p>
          </div>

          <Link
            to="/projects"
            className="
              pg-header inline-flex items-center gap-2 
              text-sm md:text-base 
              text-[hsl(var(--blue))] 
              hover:text-[hsl(var(--sapphire))] 
              transition-colors
            "
          >
            View full case studies
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Layout: hero on left, two stacked on right */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Featured / hero card */}
          <article
            className="
              pg-hero-card group relative overflow-hidden
              rounded-2xl
              border border-[hsl(var(--surface2))]
              bg-[hsl(var(--mantle))]/90
              p-6 md:p-7
              flex flex-col justify-between
              shadow-soft
            "
          >
            {/* Optional subtle gradient highlight */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-[radial-gradient(circle_at_0%_0%,hsl(var(--blue)/0.32),transparent_55%)]
                opacity-40
              "
            />

            <div className="relative flex-1 space-y-4">
              <span
                className="
                  inline-flex items-center
                  px-3 py-1 rounded-full
                  text-[11px] font-medium
                  bg-[hsl(var(--blue))/0.12]
                  text-[hsl(var(--blue))]
                  border border-[hsl(var(--blue))/0.4]
                "
              >
                Featured · {featured.category || "Digital Product"}
              </span>

              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {featured.title}
              </h3>

              <p className="text-sm md:text-base text-[hsl(var(--subtext1))] leading-relaxed max-w-xl">
                {featured.description ||
                  featured.summary ||
                  "A modern product experience shaped around clarity, speed, and real-world usage."}
              </p>
            </div>

            <div className="relative mt-6 flex items-center justify-between text-[11px] md:text-xs text-[hsl(var(--subtext0))]">
              <div className="flex flex-wrap gap-2">
                {(featured.techStack ||
                  featured.tags ||
                  featured.stack ||
                  []
                )
                  .slice(0, 3)
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

              <Link
                to={`/projects/${featured.id}`}
                className="
                  inline-flex items-center gap-1
                  text-[hsl(var(--blue))]
                  hover:text-[hsl(var(--sapphire))]
                  transition-colors
                "
              >
                View project
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

          {/* Right column: two stacked smaller cards */}
          <div className="grid gap-6">
            {sideProjects.map((project) => (
              <article
                key={project.id}
                className="
                  pg-side-card relative overflow-hidden
                  rounded-2xl
                  border border-[hsl(var(--surface2))]
                  bg-[hsl(var(--mantle))]/80
                  p-5 md:p-6
                  flex flex-col justify-between
                  shadow-soft
                "
              >
                <div className="relative">
                  <h3 className="text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(var(--subtext1))]">
                    {project.description ||
                      project.summary ||
                      "A focused build that aligns UX, performance, and long-term maintainability."}
                  </p>
                </div>

                <div className="relative mt-4 flex items-center justify-between text-[11px] text-[hsl(var(--subtext0))]">
                  <span>
                    {project.category ||
                      (project.tags && project.tags[0]) ||
                      "Case study"}
                  </span>

                  <Link
                    to={`/projects/${project.id}`}
                    className="
                      inline-flex items-center gap-1
                      text-[hsl(var(--blue))]
                      hover:text-[hsl(var(--sapphire))]
                      transition-colors
                    "
                  >
                    View ↗
                  </Link>
                </div>
              </article>
            ))}

            {/* If there are fewer than 2 side projects, show a CTA block */}
            {sideProjects.length < 2 && (
              <div
                className="
                  pg-side-card rounded-2xl border border-dashed border-[hsl(var(--surface2))]
                  bg-[hsl(var(--mantle))]/60
                  p-5 md:p-6 flex flex-col justify-center items-start
                "
              >
                <p className="text-sm text-[hsl(var(--subtext1))] mb-3">
                  More case studies are in the works.
                </p>
                <Link
                  to="/contact"
                  className="
                    inline-flex items-center gap-1 text-[hsl(var(--blue))]
                    text-xs md:text-sm
                    hover:text-[hsl(var(--sapphire))]
                  "
                >
                  Let&apos;s build something together ↗
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGlimpse;
