import type { PointerEvent, ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function TiltCard({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  function updateTilt(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y * 100}%`);
  }

  function resetTilt(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <article
      className="project-card tilt-card"
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      {children}
    </article>
  );
}
