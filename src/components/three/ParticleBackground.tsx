import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Color, type Points, PointsMaterial } from "three";

import { useCanvasActivity } from "@/hooks/use-canvas-activity";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useThemeColors, type ThemeSceneColors } from "@/hooks/use-theme-colors";

function createParticleGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 22;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 9;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  return geometry;
}

function DriftParticles({ count, colors }: { count: number; colors: ThemeSceneColors }) {
  const points = useRef<Points<BufferGeometry, PointsMaterial>>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollHue = useRef(0);
  const geometry = useMemo(() => createParticleGeometry(count), [count]);
  const color = useMemo(() => new Color(colors.accent), [colors.accent]);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 0.08;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 0.08;
    };
    const updateScroll = () => {
      scrollHue.current =
        Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight)) * 0.025;
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;

    points.current.rotation.y += delta * 0.008;
    points.current.position.x += (pointer.current.x - points.current.position.x) * delta * 0.4;
    points.current.position.y += (pointer.current.y - points.current.position.y) * delta * 0.4;
    points.current.material.color.copy(color).offsetHSL(scrollHue.current, 0, 0);
    points.current.material.opacity =
      colors.particleOpacity + Math.sin(clock.getElapsedTime() * 0.16) * 0.025;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={colors.accent}
        size={colors.particleSize}
        transparent
        opacity={colors.particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}

function supportsWebGL() {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}

export function ParticleBackground() {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [particleCount, setParticleCount] = useState(240);
  const [lowPower, setLowPower] = useState(false);
  const active = useCanvasActivity(container);

  useEffect(() => {
    setWebglAvailable(supportsWebGL());
    const lowPower =
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
      ("hardwareConcurrency" in navigator && navigator.hardwareConcurrency <= 4) ||
      ("connection" in navigator &&
        Boolean(
          (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
        ));
    setParticleCount(lowPower ? 90 : 240);
    setLowPower(lowPower);
  }, []);

  return (
    <div className="particle-background" ref={setContainer} aria-hidden="true">
      {webglAvailable && !reducedMotion && colors ? (
        <Canvas
          dpr={lowPower ? 1 : [1, 1.5]}
          frameloop={active ? "always" : "never"}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 8], fov: 48 }}
        >
          <DriftParticles count={particleCount} colors={colors} />
        </Canvas>
      ) : (
        <div className="particle-background-fallback" />
      )}
    </div>
  );
}
