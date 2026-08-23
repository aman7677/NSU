import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      onClick={toggle}
      className={`relative inline-flex h-8 w-[60px] shrink-0 items-center rounded-full border p-1 transition-colors duration-300 focus-visible:outline-none ${className}`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-[var(--text-secondary)]"
      >
        <Sun size={12} strokeWidth={2.2} />
        <Moon size={12} strokeWidth={2.2} />
      </span>
      <span
        aria-hidden="true"
        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent shadow-sm transition-transform duration-300 ease-out ${isDark ? "translate-x-7" : "translate-x-0"}`}
      >
        {isDark ? <Moon size={12} strokeWidth={2.4} /> : <Sun size={12} strokeWidth={2.4} />}
      </span>
    </button>
  );
}