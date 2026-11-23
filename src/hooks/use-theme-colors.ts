import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

export type ThemeSceneColors = {
  accent: string;
  highlight: string;
  glowIntensity: number;
  keyLightIntensity: number;
  fillLightIntensity: number;
  particleSize: number;
  particleOpacity: number;
};

function readColorValue(styles: CSSStyleDeclaration, name: string) {
  const value = styles.getPropertyValue(name).trim();
  if (!value) throw new Error(`Missing theme color variable: ${name}`);
  return value;
}

function readNumberValue(styles: CSSStyleDeclaration, name: string) {
  const value = Number.parseFloat(readColorValue(styles, name));
  if (!Number.isFinite(value)) throw new Error(`Invalid theme color variable: ${name}`);
  return value;
}

export function useThemeColors() {
  const { theme } = useTheme();
  const [colors, setColors] = useState<ThemeSceneColors | null>(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setColors({
      accent: readColorValue(styles, "--scene-accent"),
      highlight: readColorValue(styles, "--scene-highlight"),
      glowIntensity: readNumberValue(styles, "--scene-glow-intensity"),
      keyLightIntensity: readNumberValue(styles, "--scene-key-light-intensity"),
      fillLightIntensity: readNumberValue(styles, "--scene-fill-light-intensity"),
      particleSize: readNumberValue(styles, "--scene-particle-size"),
      particleOpacity: readNumberValue(styles, "--scene-particle-opacity"),
    });
  }, [theme]);

  return colors;
}
