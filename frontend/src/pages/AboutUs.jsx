import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AboutHero from "../components/about/AboutHero";
import MissionVisionSection from "../components/about/MissionVisionSection";
import JourneySection from "../components/about/JourneySection";
import ValuesSection from "../components/about/ValuesSection";
import WhyPartnerSection from "../components/about/WhyPartnerSection";
import ProcessSection from "../components/about/ProcessSection";
import CultureVideoSection from "../components/about/CultureVideoSection";
import TestimonialsSection from "../components/about/TestimonialsSection";
import QualitySecuritySection from "../components/about/QualitySecuritySection";
import TechStackSection from "../components/about/TechStackSection";
import IndustriesSection from "../components/about/IndustriesSection";
import CtaSection from "../components/about/CtaSection";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const comp = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // --- SCROLL-BASED ANIMATIONS (after hero sequence) ---
          const animateIn = (selector, vars = {}) => {
            gsap.utils.toArray(selector).forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
                ...vars,
              });
            });
          };
          animateIn(".animate-in-view");
        },
      });

      // 1. Animate hero text content
      tl.from(".hero-content > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
      });

      // 2. Animate numbers after hero text
      tl.from(".stat-number", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2,
      }, "-=0.5"); // Overlap with hero animation slightly
    },
    { scope: comp }
  );

  return (
    <div
      ref={comp}
      className="bg-[hsl(var(--base))] text-[hsl(var(--text))] font-serif"
    >
      <AboutHero />
      <MissionVisionSection />
      <JourneySection />
      <ValuesSection />
      <WhyPartnerSection />
      <ProcessSection />
      <CultureVideoSection />
      <TestimonialsSection />
      <QualitySecuritySection />
      <TechStackSection />
      <IndustriesSection />
      <CtaSection />
    </div>
  );
};

export default AboutUs;
