import { useEffect, useState } from "react";

export function useCanvasActivity(element: Element | null) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!element) return;

    const updateVisibility = () => {
      setActive(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    if (typeof IntersectionObserver === "undefined") {
      return () => document.removeEventListener("visibilitychange", updateVisibility);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setActive(entry.isIntersecting && document.visibilityState === "visible");
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [element]);

  return active;
}
