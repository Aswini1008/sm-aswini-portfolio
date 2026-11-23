import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";

import { useCanvasActivity } from "@/hooks/use-canvas-activity";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useThemeColors, type ThemeSceneColors } from "@/hooks/use-theme-colors";

const orbitingParticles: [number, number, number][] = [
  [-1.52, 0.52, 0.1],
  [1.46, 0.42, -0.2],
  [0.08, 1.48, 0.2],
  [-0.28, -1.54, 0],
  [1.28, -0.76, 0.12],
  [-1.35, -0.8, -0.1],
];

function HeroObject({ colors }: { colors: ThemeSceneColors }) {
  const group = useRef<Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollScale = useRef(1);
  const viewportWidth = useThree((state) => state.viewport.width);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    group.current.position.x = viewportWidth * 0.3 + targetRotation.current.x * 0.12;
    group.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
    group.current.rotation.x +=
      (targetRotation.current.y * 0.13 - group.current.rotation.x) * delta * 2;
    group.current.rotation.y +=
      (elapsed * 0.12 + targetRotation.current.x * 0.2 - group.current.rotation.y) * delta * 1.5;
    group.current.scale.setScalar(
      group.current.scale.x + (scrollScale.current - group.current.scale.x) * delta * 2,
    );
  });

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-section");
    if (!hero) return;

    const updateScrollScale = () => {
      const progress = Math.min(
        1,
        Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight),
      );
      scrollScale.current = 1 - progress * 0.12;
    };

    const updatePointer = (event: PointerEvent) => {
      targetRotation.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("scroll", updateScrollScale, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    updateScrollScale();

    return () => {
      window.removeEventListener("scroll", updateScrollScale);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 7]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={colors.glowIntensity}
          roughness={0.28}
          metalness={0.3}
        />
      </mesh>
      <mesh scale={1.006}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color={colors.highlight} wireframe transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[0.95, 0.18, -0.3]}>
        <torusGeometry args={[1.65, 0.006, 8, 120]} />
        <meshBasicMaterial color={colors.highlight} transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[-0.72, 0.35, 0.42]}>
        <torusGeometry args={[1.85, 0.004, 8, 120]} />
        <meshBasicMaterial color={colors.accent} transparent opacity={0.32} />
      </mesh>

      {orbitingParticles.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 2 === 0 ? 0.035 : 0.022, 10, 10]} />
          <meshBasicMaterial color={index % 2 === 0 ? colors.highlight : colors.accent} />
        </mesh>
      ))}
    </group>
  );
}

function supportsWebGL() {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const active = useCanvasActivity(container);

  useEffect(() => {
    setWebglAvailable(supportsWebGL());
    setLowPower(
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
        navigator.hardwareConcurrency <= 4 ||
        Boolean(
          (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
        ),
    );
  }, []);

  const fallback = useMemo(() => <div className="hero-scene-fallback" />, []);

  return (
    <div className="hero-scene" ref={setContainer} aria-hidden="true">
      {webglAvailable && !reducedMotion && colors ? (
        <Canvas
          dpr={lowPower ? 1 : [1, 2]}
          frameloop={active ? (lowPower ? "demand" : "always") : "never"}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 5.2], fov: 42 }}
        >
          <ambientLight intensity={0.7} />
          <pointLight
            position={[2.5, 2.5, 4]}
            color={colors.highlight}
            intensity={colors.keyLightIntensity}
            distance={8}
          />
          <pointLight
            position={[-3, -2, 1]}
            color={colors.accent}
            intensity={colors.fillLightIntensity}
            distance={7}
          />
          <HeroObject colors={colors} />
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}
