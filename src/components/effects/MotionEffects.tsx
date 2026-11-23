import { useEffect } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MotionEffects() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".portfolio-section");
    if (typeof IntersectionObserver === "undefined") {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const finePointer = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const lowPower = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
    if (!finePointer.matches || lowPower) return;

    const targets = document.querySelectorAll<HTMLElement>(
      ".portfolio-shell button:not(:disabled):not(.nav-menu-button):not(.theme-toggle), .portfolio-shell .hero-actions a, .portfolio-shell .nav-cta a, .portfolio-shell .mobile-nav-cta",
    );
    const cleanups = Array.from(targets, (target) => {
      const moveTarget = (event: PointerEvent) => {
        if (window.innerWidth < 768 || !finePointer.matches) return;
        const bounds = target.getBoundingClientRect();
        const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
        const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
        target.style.translate = `${offsetX}px ${offsetY}px`;
      };
      const resetTarget = () => {
        target.style.translate = "";
      };

      target.classList.add("magnetic-target");
      target.addEventListener("pointermove", moveTarget);
      target.addEventListener("pointerleave", resetTarget);

      return () => {
        target.removeEventListener("pointermove", moveTarget);
        target.removeEventListener("pointerleave", resetTarget);
        target.classList.remove("magnetic-target");
        resetTarget();
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;

    const portrait = document.querySelector<HTMLElement>(".about-portrait");
    if (!portrait) return;

    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = portrait.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
        const distance = bounds.top + bounds.height / 2 - window.innerHeight / 2;
        portrait.style.setProperty(
          "--portrait-parallax",
          `${Math.max(-8, Math.min(8, -distance * 0.018))}px`,
        );
      });
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener("scroll", updateParallax);
      cancelAnimationFrame(frame);
      portrait.style.removeProperty("--portrait-parallax");
    };
  }, [reducedMotion]);

  return null;
}
