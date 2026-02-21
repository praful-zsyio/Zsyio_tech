import React from "react";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "../utils/hooks";
import clsx from "clsx";

const BackToTopButton = () => {
  const isVisible = useScrollPosition(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={clsx(
        `
        fixed bottom-6 right-6 z-50
        h-12 w-12 flex items-center justify-center
        rounded-2xl backdrop-blur-xl
      
        bg-[hsl(var(--mantle)/0.5)]
        border border-[hsl(var(--surface2)/0.5)]
        shadow-[0_4px_25px_rgba(0,0,0,0.25)]

        text-[hsl(var(--text))]
        transition-all duration-300
        hover:shadow-[0_4px_30px_rgba(56,189,248,0.45)]
        hover:border-[hsl(var(--blue))]
        hover:scale-105
      `,
        isVisible
          ? "opacity-100 visible scale-100 translate-y-0"
          : "opacity-0 invisible scale-90 translate-y-4"
      )}
    >
      <ArrowUp size={22} className="text-[hsl(var(--blue))]" />
    </button>
  );
};

export default BackToTopButton;
