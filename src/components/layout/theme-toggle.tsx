"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME_KEY, applyTheme, type Theme } from "@/lib/theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * The `dark` class on <html> is the source of truth. The toggle, the OS
 * setting (until someone picks) and a choice made in another tab all change
 * that class, and the observer reports every change back to React.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (!storedTheme()) applyTheme(system.matches ? "dark" : "light");
  };
  // Another tab saved (or cleared) a choice
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_KEY && e.key !== null) return;
    applyTheme(storedTheme() ?? (system.matches ? "dark" : "light"));
  };
  system.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    system.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

const isDark = () => document.documentElement.classList.contains("dark");
// The server can't know the theme, so the icon is chosen by CSS (dark:
// variant) and the label is generic until hydration
const isDarkOnServer = () => null;

/**
 * Sun/moon switch in the navbar. The theme script in layout.tsx has already
 * set the class before paint; this reads it back, flips it, and remembers
 * the choice.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore<boolean | null>(subscribe, isDark, isDarkOnServer);

  const toggle = () => {
    const next: Theme = isDark() ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the switch still works for this page view
    }
  };

  // The label names the action, so it changes with the theme
  const label = dark === null ? "Toggle dark theme" : dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-11 w-11 -my-1 items-center justify-center rounded-full",
        "text-[var(--charcoal)] transition-colors hover:bg-[rgb(var(--tint-rgb)/0.06)]",
        className
      )}
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
