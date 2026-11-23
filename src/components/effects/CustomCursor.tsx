import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.25 });
  const springScale = useSpring(scale, { stiffness: 380, damping: 24 });

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const updateEnabled = () => setEnabled(finePointer.matches && window.innerWidth >= 768);
    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    window.addEventListener("resize", updateEnabled, { passive: true });

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      window.removeEventListener("resize", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const moveCursor = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target;
      scale.set(target instanceof Element && target.closest("a, button") ? 1.6 : 1);
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    return () => window.removeEventListener("pointermove", moveCursor);
  }, [enabled, reducedMotion, scale, x, y]);

  if (!enabled || reducedMotion) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: springX, y: springY, scale: springScale }}
      aria-hidden="true"
    />
  );
}
