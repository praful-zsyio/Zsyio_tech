import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ServicesGrid from "../components/services/ServicesGrid";
import TechnologiesGrid from "../components/services/TechnologiesGrid";
import CartAndContact from "../components/services/CartAndContact";

const ServicesPage = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-[hsl(var(--base))]"
    >
      {/* Background Grid */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]
          bg-size-[24px_24px]
        "
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs text-[hsl(var(--subtext1))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            What we do
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[hsl(var(--text))]">
            Services
          </h1>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            End-to-end product, design, and engineering services focused on
            shipping reliable, scalable digital systems.
          </p>
        </motion.header>

        {/* Sections */}
        <div id="grid"><ServicesGrid isInView={isInView} /></div>
        <div id="tech"><TechnologiesGrid isInView={isInView} /></div>
        <div id="estimation"><CartAndContact /></div>
      </div>
    </section>
  );
};

export default ServicesPage;
