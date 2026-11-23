import { motion, useScroll, useSpring } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reducedMotion ? scrollYProgress : progress }}
      aria-hidden="true"
    />
  );
}
