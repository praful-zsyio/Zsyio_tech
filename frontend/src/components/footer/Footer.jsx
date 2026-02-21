import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Twitter,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Dribbble,
} from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/zsyio-technology-0b0005391/" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/zsyio_tech/" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Dribbble, label: "Dribbble", href: "#" },
];

const Footer = () => {
  const container = useRef(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      if (!container.current) return;

      const elements = container.current.querySelectorAll(".footer-animate");

      gsap.from(elements, {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <footer
      ref={container}
      className="
        relative
        border-t border-[hsl(var(--surface1))]
        bg-[hsl(var(--mantle))]
        text-[hsl(var(--subtext1))]
        font-sans
        overflow-hidden
      "
    >
      {/* Glow + grid background */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_65%)]
        "
        aria-hidden="true"
      />
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

      <div className="max-w-7xl mx-auto py-12 md:py-14 px-6">
        {/* Top section */}
        <div
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-10 mb-10
          "
        >
          {/* Company Info */}
          <div className="footer-animate">
            <h2 className="text-2xl font-bold text-[hsl(var(--text))] mb-3">
              Zsyio
            </h2>
            <p className="text-sm leading-relaxed">
              Pioneering digital transformation through modern, reliable
              software, web, and mobile solutions that actually ship and scale.
            </p>
            <p className="mt-3 text-xs text-[hsl(var(--subtext0))]">
              Based in India, collaborating with teams worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <h3 className="text-lg font-semibold text-[hsl(var(--text))] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-animate">
            <h3 className="text-lg font-semibold text-[hsl(var(--text))] mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/trademarks"
                  className="hover:text-[hsl(var(--blue))] transition-colors"
                >
                  Trademarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-animate">
            <h3 className="text-lg font-semibold text-[hsl(var(--text))] mb-4">
              Follow Us
            </h3>

            <div
              className="
                flex flex-wrap gap-3
                bg-[hsl(var(--base))]/10
                border border-[hsl(var(--surface2))]
                rounded-2xl px-3 py-3
                backdrop-blur-xl
              "
            >
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-full
                    text-[hsl(var(--subtext1))]
                    border border-transparent
                    hover:text-[hsl(var(--text))]
                    hover:border-[hsl(var(--blue))]
                    hover:bg-[hsl(var(--blue))]/10
                    transition-all duration-200
                  "
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[hsl(var(--surface1))] pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm footer-animate">
          <p>&copy; {currentYear} Zsyio. All rights reserved.</p>
          <p className="text-[hsl(var(--subtext0))]">
            Crafted with care, performance, and a bit of caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
