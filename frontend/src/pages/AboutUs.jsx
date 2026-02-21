import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAbout } from "../services/api";

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
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Add a timeout to ensure we don't stay stuck on the loading screen forever
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn("About API check timed out, continuing...");
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    getAbout()
      .then((response) => {
        if (isMounted && response.data) {
          // If response is an array, take the first item
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          setAboutData(data);
        }
      })
      .catch((err) => console.error("About API fetch failed:", err))
      .finally(() => {
        clearTimeout(timeoutId);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(
    () => {
      if (loading) return;

      const tl = gsap.timeline();

      // Safety: Only animate if hero text exists
      const heroText = gsap.utils.toArray(".hero-content > *");
      if (heroText.length > 0) {
        tl.from(heroText, {
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      // Safety: Only animate stats if they exist
      const stats = gsap.utils.toArray(".stat-number");
      if (stats.length > 0) {
        tl.from(stats, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
        }, "-=0.5");
      }

      // Scroll animations
      const animateIn = (selector) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el) => {
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
          });
        });
      };
      animateIn(".animate-in-view");
    },
    { scope: comp, dependencies: [loading] }
  );

  return (
    <div
      ref={comp}
      className="bg-[hsl(var(--base))] text-[hsl(var(--text))] font-serif min-h-screen"
    >
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-[hsl(var(--base))] z-[9999]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-[hsl(var(--blue))] border-t-transparent rounded-full animate-spin" />
            <p className="text-[hsl(var(--text))] text-sm font-medium animate-pulse">Initializing Zsyio...</p>
          </div>
        </div>
      ) : (
        <div className="opacity-100 transition-opacity duration-700">
          <AboutHero data={aboutData} />
          <MissionVisionSection data={aboutData} />
          <JourneySection data={aboutData} />
          <ValuesSection data={aboutData} />
          <WhyPartnerSection data={aboutData} />
          <ProcessSection data={aboutData} />
          <CultureVideoSection data={aboutData} />
          <TestimonialsSection data={aboutData} />
          <QualitySecuritySection data={aboutData} />
          <TechStackSection data={aboutData} />
          <IndustriesSection data={aboutData} />
          <CtaSection data={aboutData} />
        </div>
      )}
    </div>
  );
};

export default AboutUs;
