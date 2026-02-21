import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Zap, Users, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const titles = section.querySelectorAll(".title-animate");
      const cards = section.querySelectorAll(".feature-card");
      const icons = section.querySelectorAll(".feature-card svg");
      const cta = section.querySelector(".about-cta");

      // TITLES – smooth fade + slide up
      gsap.from(titles, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // CARDS – 3D pop-in (NO opacity, so they never stay hidden)
      gsap.fromTo(
        cards,
        {
          y: 60,
          rotateX: 12,
          transformPerspective: 800,
        },
        {
          y: 0,
          rotateX: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ICONS – little pop effect
      gsap.fromTo(
        icons,
        { scale: 0.6, y: 8 },
        {
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // CTA – delayed subtle rise
      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        pt-16 md:pt-24
        overflow-hidden
        bg-[hsl(var(--mantle))]
      "
    >
      {/* Subtle glow background */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_65%)]
        "
        aria-hidden="true"
      />
      {/* Soft grid overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-40
        "
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading block */}
        <div className="text-center">
          <div
            className="
              inline-flex items-center gap-2 rounded-full
              border border-[hsl(var(--surface2))]
              bg-[hsl(var(--mantle))]/80
              px-4 py-1
              text-xs md:text-sm
              text-[hsl(var(--subtext1))]
              mb-4
              title-animate
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>About Zsyio</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold leading-8 text-[hsl(var(--blue))] title-animate">
            Who We Are
          </h2>
          <p className="mt-2 text-xl font-bold tracking-tight text-[hsl(var(--text))] sm:text-2xl title-animate">
            Your Partner in Digital Transformation
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[hsl(var(--subtext1))] title-animate">
            At Zsyio, we are more than just an IT company. We are architects of
            digital innovation, crafting bespoke software, web, and mobile
            solutions that empower businesses to scale, innovate, and lead in
            their respective industries.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          <div
            className="
              feature-card group relative
              bg-[hsl(var(--base))]/80
              border border-[hsl(var(--surface2))]
              rounded-2xl
              p-6 md:p-7
              shadow-soft
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:border-[hsl(var(--blue))]
              hover:shadow-[0_0_28px_rgba(56,189,248,0.28)]
            "
          >
            {/* Glow on hover */}
            <div
              className="
                pointer-events-none absolute inset-0 opacity-0
                group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_65%)]
              "
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center">
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--blue))]/10 border border-[hsl(var(--blue))]/60">
                  <Zap className="w-6 h-6 text-[hsl(var(--blue))]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--text))]">
                Innovation-Driven
              </h3>
              <p className="mt-3 text-base text-[hsl(var(--subtext1))] leading-relaxed">
                We leverage the latest technologies to build future-proof
                solutions that give you a competitive edge.
              </p>
            </div>
          </div>

          <div
            className="
              feature-card group relative
              bg-[hsl(var(--base))]/80
              border border-[hsl(var(--surface2))]
              rounded-2xl
              p-6 md:p-7
              shadow-soft
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:border-[hsl(var(--blue))]
              hover:shadow-[0_0_28px_rgba(56,189,248,0.28)]
            "
          >
            <div
              className="
                pointer-events-none absolute inset-0 opacity-0
                group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_65%)]
              "
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center">
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--blue))]/10 border border-[hsl(var(--blue))]/60">
                  <Users className="w-6 h-6 text-[hsl(var(--blue))]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--text))]">
                Client-Centric
              </h3>
              <p className="mt-3 text-base text-[hsl(var(--subtext1))] leading-relaxed">
                Your success is our mission. We work as a true extension of your
                team to achieve your goals.
              </p>
            </div>
          </div>

          <div
            className="
              feature-card group relative
              bg-[hsl(var(--base))]/80
              border border-[hsl(var(--surface2))]
              rounded-2xl
              p-6 md:p-7
              shadow-soft
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:border-[hsl(var(--blue))]
              hover:shadow-[0_0_28px_rgba(56,189,248,0.28)]
            "
          >
            <div
              className="
                pointer-events-none absolute inset-0 opacity-0
                group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_65%)]
              "
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center">
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--blue))]/10 border border-[hsl(var(--blue))]/60">
                  <Award className="w-6 h-6 text-[hsl(var(--blue))]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--text))]">
                Unmatched Quality
              </h3>
              <p className="mt-3 text-base text-[hsl(var(--subtext1))] leading-relaxed">
                Our commitment to excellence ensures we deliver robust, secure,
                and scalable products every time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center feature-card about-cta">
          <Link
            to="/about"
            className="
              inline-block
              rounded-xl
              bg-[hsl(var(--blue))]
              px-6 md:px-8 py-3
              text-base
              font-semibold
              text-[hsl(var(--crust))]
              shadow-soft
              border border-transparent
              transition-all duration-300
              hover:bg-[hsl(var(--blue))]/90
              hover:-translate-y-1
              hover:shadow-[0_0_22px_rgba(56,189,248,0.25)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[hsl(var(--blue))]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[hsl(var(--base))]
            "
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
