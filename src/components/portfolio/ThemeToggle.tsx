import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? <Sun /> : <Moon />;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`theme-toggle ${className}`.trim()}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
    >
      {reducedMotion ? (
        <span className="theme-toggle-icon" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <motion.span
          className="theme-toggle-icon"
          initial={false}
          animate={{ rotate: theme === "light" ? 180 : 0, scale: theme === "light" ? 0.92 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          aria-hidden="true"
        >
          {icon}
        </motion.span>
      )}
    </Button>
  );
}
