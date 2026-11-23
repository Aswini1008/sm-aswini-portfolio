import { useEffect } from "react";
import Lenis from "lenis";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      anchors: { offset: -76 },
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
    });
    const notifyPortfolioScroll = () => window.dispatchEvent(new Event("portfolio-scroll"));
    lenis.on("scroll", notifyPortfolioScroll);

    return () => {
      lenis.off("scroll", notifyPortfolioScroll);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
